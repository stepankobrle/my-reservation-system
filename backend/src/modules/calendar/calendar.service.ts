import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) {}

    async getCalendarView(restaurantId: string, date: string) {
        const start = startOfDay(new Date(date));
        const end = endOfDay(new Date(date));

        const tables = await this.prisma.table.findMany({
            where: { restaurantId },
            orderBy: { number: 'asc' },
        });

        const reservations = await this.prisma.reservation.findMany({
            where: {
                restaurantId,
                reservationTime: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                guest: true,
            },
            orderBy: { reservationTime: 'asc' },
        });

        const reservationsByTable = tables.map((table) => {
            const tableReservations = reservations
                .filter((r) => r.tableId === table.id)
                .map((r) => ({
                    id: r.id,
                    guestName: `${r.guest.firstName} ${r.guest.lastName}`,
                    start: r.reservationTime,
                    end: new Date(new Date(r.reservationTime).getTime() + 90 * 60000), // např. 90 min blok
                    peopleCount: r.peopleCount,
                    status: r.status,
                }));

            return {
                id: table.id,
                number: table.number,
                capacity: table.capacity,
                reservations: tableReservations,
            };
        });

        return { tables: reservationsByTable };
    }
}
