// reservation.service.ts (logika pro admin i veřejnost)
import {BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../utils/email.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AvailableTimesDto } from './dto/available-times.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
  ) {}


  async getAvailableTables(restaurantId: string, dateTime: string, peopleCount: number) {
    const targetDate = new Date(dateTime);

    // 1️⃣ Najdi všechny stoly s dostatečnou kapacitou
    const tables = await this.prisma.table.findMany({
      where: {
        restaurantId,
        capacity: { gte: peopleCount },
      },
      orderBy: { capacity: 'asc' },
    });

    if (!tables.length) {
      return []; // žádné vhodné stoly
    }

    // 2️⃣ Definuj rozsah pro "stejný časový slot"
    const slotStart = new Date(targetDate);
    const slotEnd = new Date(targetDate.getTime() + 29 * 60 * 1000); // 30min slot

    // 3️⃣ Zjisti rezervace v daný časový slot
    const reservations = await this.prisma.reservation.findMany({
      where: {
        reservationTime: {
          gte: slotStart,
          lte: slotEnd,
        },
        tableId: {
          in: tables.map(t => t.id),
        },
      },
      select: {
        tableId: true,
      },
    });

    const reservedIds = new Set(reservations.map(r => r.tableId));

    // 4️⃣ Vrátíme pouze volné stoly
    const available = tables.filter(t => !reservedIds.has(t.id));

    return available;
  }



  async getAvailableTimes(dto: AvailableTimesDto) {
    const { date, peopleCount, restaurantId } = dto;

    const now = new Date();
    const tables = await this.prisma.table.findMany({
      where: {
        capacity: { gte: peopleCount },
        restaurantId,
      },
    });

    const openingHour = 12;
    const closingHour = 22;
    const intervalMinutes = 30;
    const availableTimes: string[] = [];

    for (let hour = openingHour; hour < closingHour; hour++) {
      for (let min = 0; min < 60; min += intervalMinutes) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const dateTime = new Date(`${date}T${time}:00`);

        // ⛔ Přeskoč časy, které jsou v minulosti
        if (dateTime < now) continue;

        const reservations = await this.prisma.reservation.findMany({
          where: {
            reservationTime: dateTime,
            table: {
              id: { in: tables.map(t => t.id) },
            },
          },
        });

        const reservedTableIds = new Set(reservations.map(r => r.tableId));
        const availableTableCount = tables.filter(t => !reservedTableIds.has(t.id)).length;

        if (availableTableCount > 0) {
          availableTimes.push(time);
        }
      }
    }

    return availableTimes;
  }




  async createReservation(dto: CreateReservationDto) {
    const reservationDate = new Date(dto.dateTime);
    const now = new Date();
    const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    if (reservationDate < threeHoursFromNow) {
      throw new BadRequestException('Rezervaci je nutné provést alespoň 3 hodiny předem.');
    }

    // 1. Před samotným vytvářením rezervace – aktualizace starých
    await this.prisma.reservation.updateMany({
      where: {
        status: 'PENDING',
        reservationTime: { lt: new Date() },
      },
      data: {
        status: 'CONFIRMED',
      },
    });

    const existingPendingReservations = await this.prisma.reservation.findMany({
      where: {
        guest: { email: dto.guest.email },
        status: 'PENDING', // ⬅️ jen pending
      },
    });
    if (existingPendingReservations.length >= 2) {
      throw new BadRequestException('Na tento e-mail již existují dvě nevyřízené rezervace.');
    }

    const suitableTables = await this.prisma.table.findMany({
      where: {
        restaurantId: dto.restaurantId,
        capacity: { gte: dto.peopleCount },
      },
      orderBy: { capacity: 'asc' },
    });

    const reservationsAtTime = await this.prisma.reservation.findMany({
      where: {
        reservationTime: reservationDate,
        tableId: { in: suitableTables.map(t => t.id) },
      },
    });

    const reservedTableIds = new Set(reservationsAtTime.map(r => r.tableId));
    const availableTable = suitableTables.find(t => !reservedTableIds.has(t.id));

    if (!availableTable) {
      throw new BadRequestException('V daný čas není dostupný žádný vhodný stůl.');
    }

    const guest = await this.prisma.guest.upsert({
      where: { email: dto.guest.email },
      update: {
        firstName: dto.guest.firstName,
        lastName: dto.guest.lastName,
        phone: dto.guest.phone,
      },
      create: {
        email: dto.guest.email,
        firstName: dto.guest.firstName,
        lastName: dto.guest.lastName,
        phone: dto.guest.phone,
      },
    });
    const reservation = await this.prisma.reservation.create({
      data: {
        guestId: guest.id,
        reservationTime: new Date(dto.dateTime), // ✅ převedeno na Date
        peopleCount: dto.peopleCount,
        status: 'PENDING',
        note: dto.note,
        restaurantId: dto.restaurantId,
        tableId: dto.tableId,
      },
    });



    // Odeslání e-mailu hostovi
    const token = this.jwtService.sign(
        { reservationId: reservation.id },
        { expiresIn: '2d' }
    );
    const manageUrl = `${process.env.APP_URL}/reservation/manage?token=${token}`;

    const emailContent = `
  Dobrý den ${guest.firstName},

  Vaše rezervace byla přijata:
  Datum: ${dto.dateTime}
  Počet osob: ${dto.peopleCount}
  Poznámka: ${dto.note || '-'}

  Pro úpravu nebo zrušení rezervace klikněte zde:
  ${manageUrl}
`;

    await this.emailService.sendEmail(guest.email, 'Potvrzení rezervace', emailContent);


    // Získání e-mailu admina restaurace
    const admins = await this.prisma.user.findMany({
      where: {
        restaurantId: dto.restaurantId,
        role: 'ADMIN',
      },
    });

    for (const admin of admins) {
      const adminEmail = `
        Nová rezervace:
        Datum: ${dto.dateTime}
        Počet osob: ${dto.peopleCount}
        Host: ${guest.firstName} ${guest.lastName} (${guest.email})
        Poznámka: ${dto.note || '-'}
      `;
      await this.emailService.sendEmail(admin.email, 'Nová rezervace', adminEmail);
    }

    // 2. Odeslání notifikace pro restauraci
    await this.notificationsService.createNotification({
      type: 'NEW_RESERVATION',
      message: `Nová rezervace od ${guest.firstName} ${guest.lastName} (${reservation.peopleCount} osob)`,
      restaurantId: reservation.restaurantId,
      guestId: guest.id, // ← přidáš propojení na hosta
      reservationTime: reservation.reservationTime, // ← pokud chceš zobrazovat i čas
    });


    return reservation;
  }





  async findAll(restaurantId: string) {
    return this.prisma.reservation.findMany({
      where: { restaurantId },
      include: {
        guest: true,
        table: true,
        restaurant: true,
      },
      orderBy: { reservationTime: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        guest: true,
        table: true,
        restaurant: true,
      },
    });
  }

  async update(id: string, dto: CreateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data: {
        reservationTime: new Date(dto.dateTime),
        peopleCount: dto.peopleCount,
        note: dto.note,
        tableId: dto.tableId,
        status: dto.status, // ➕ přidáno
      },
    });
  }

  async remove(id: string) {
    return this.prisma.reservation.delete({
      where: { id },
    });
  }

  async findByToken(token: string) {
    const payload = this.jwtService.verify(token);
    return this.prisma.reservation.findUnique({
      where: { id: payload.reservationId },
      include: {
        guest: true,
        table: true,
        restaurant: true,
      },
    });
  }



  async updateByToken(token: string, dto: CreateReservationDto) {
    const payload = this.jwtService.verify(token);
    const reservationId = payload.reservationId;

    const newDate = new Date(dto.dateTime);
    const now = new Date();

    if (newDate < now) {
      throw new BadRequestException('Rezervaci nelze změnit na čas v minulosti.');
    }

    const original = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!original) {
      throw new NotFoundException('Rezervace nebyla nalezena.');
    }

    const suitableTables = await this.prisma.table.findMany({
      where: {
        restaurantId: dto.restaurantId,
        capacity: { gte: dto.peopleCount },
      },
      orderBy: { capacity: 'asc' },
    });

    const reservationsAtTime = await this.prisma.reservation.findMany({
      where: {
        reservationTime: newDate,
        tableId: { in: suitableTables.map(t => t.id) },
        NOT: { id: reservationId }, // vynech původní rezervaci
      },
    });

    const reservedTableIds = new Set(reservationsAtTime.map(r => r.tableId));
    const availableTable = suitableTables.find(t => !reservedTableIds.has(t.id));

    if (!availableTable) {
      throw new BadRequestException('V daný čas není dostupný žádný vhodný stůl.');
    }

    const updated = await this.prisma.reservation.update({
      where: { id: reservationId },
      data: {
        reservationTime: newDate,
        peopleCount: dto.peopleCount,
        note: dto.note,
        tableId: availableTable.id,
      },
      include: {
        guest: true
      }
    });

    const fullName = `${updated.guest.firstName} ${updated.guest.lastName}`;

    await this.notificationsService.createNotification({
      type: 'RESERVATION_UPDATED',
      message: `Rezervace hosta ${fullName} byla upravena.`,
      restaurantId: dto.restaurantId,
      guestId: updated.guest.id,
      reservationTime: new Date(dto.dateTime),
    });

return updated;
  }




  async removeByToken(token: string) {
    const payload = this.jwtService.verify(token);
    return this.prisma.reservation.delete({
      where: { id: payload.reservationId },
    });
  }
}
