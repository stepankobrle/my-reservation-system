import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PublicMenuService {
  constructor(private prisma: PrismaService) {}

  async getMenusForRestaurant(restaurantId: string) {
    const tabs = await this.prisma.menuTab.findMany({
      where: { restaurantId },
      include: {
        menus: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            items: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return tabs.map((tab) => ({
      id: tab.id,
      tabName: tab.name,
      menus: tab.menus,
    }));
  }
}