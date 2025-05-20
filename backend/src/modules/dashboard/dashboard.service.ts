import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}
    async getReservationStats(restaurantId: string) {
        return this.prisma.reservation.groupBy({
            by: ['status'],
            where: { restaurantId },
            _count: true,
        });
    }

    async getLatestNotifications(restaurantId: string) {
        return this.prisma.notification.findMany({
            where: { restaurantId },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
    }

    async getUpcomingReservations(restaurantId: string) {
        return this.prisma.reservation.findMany({
            where: {
                restaurantId,
                reservationTime: { gte: new Date() },
            },
            orderBy: { reservationTime: 'asc' },
            take: 5,
            include: { guest: true },
        });
    }

    async getDashboardData(restaurantId: string) {
        const [notifications, reservations, stats] = await Promise.all([
            this.getLatestNotifications(restaurantId),
            this.getUpcomingReservations(restaurantId),
            this.getReservationStats(restaurantId),
        ]);

        return { notifications, reservations, stats };
    }
}
