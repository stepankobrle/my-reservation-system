import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

type CreateNotificationInput = {
    type: string;
    message: string;
    restaurantId: string;
    guestId?: string;
    reservationTime?: Date | string;
};


@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) {}

    async createNotification(data: CreateNotificationInput) {
        return this.prisma.notification.create({
            data: {
                type: data.type,
                message: data.message,
                restaurantId: data.restaurantId,
                guestId: data.guestId, // ← NOVÉ
                reservationTime: data.reservationTime ? new Date(data.reservationTime) : undefined,
            },
        });
    }



    async findAllForRestaurant(restaurantId: string) {
        return this.prisma.notification.findMany({
            where: { restaurantId },
            include: { guest: true }, // ← musí tam být
            orderBy: { createdAt: 'desc' },
        });
    }

    async findUnread(restaurantId: string) {
        return this.prisma.notification.findMany({
            where: {
                restaurantId,
                isRead: false,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: string) {
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
