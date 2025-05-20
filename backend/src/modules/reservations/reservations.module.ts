import { Module } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { AdminReservationController, PublicReservationController } from './reservations.controller'; // přidáno
import { AuthModule } from '../auth/auth.module';
import { EmailService } from '../../utils/email.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [AuthModule, PrismaModule, NotificationsModule],
  controllers: [
    AdminReservationController,
    PublicReservationController, // ⬅️ přidáno!
  ],
  providers: [ReservationService, EmailService],
})
export class ReservationsModule {}
