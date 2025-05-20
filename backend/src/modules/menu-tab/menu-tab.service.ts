import {Body, Injectable, Req} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuTabDto } from './dto/create-menu-tab.dto';

@Injectable()
export class MenuTabsService {
  constructor(private prisma: PrismaService) {}

  findAll(restaurantId: string) {
    return this.prisma.menuTab.findMany({
      where: { restaurantId },
      include: { menus: true },
      orderBy: { order: 'asc' },
    });
  }

  async updateTabOrder(updates: { id: string; order: number }[]) {
    const promises = updates.map(({ id, order }) =>
        this.prisma.menuTab.update({
          where: { id },
          data: { order },
        })
    );
    await Promise.all(promises);
  }

  async create(dto: CreateMenuTabDto, restaurantId: string) {
    const lastTab = await this.prisma.menuTab.findFirst({
      where: { restaurantId },
      orderBy: { order: 'desc' },
    });

    const nextOrder = lastTab ? lastTab.order + 1 : 1;

    return this.prisma.menuTab.create({
      data: {
        name: dto.name,
        restaurantId,
        order: nextOrder,
      },
    });
  }

  remove(id: string) {
    return this.prisma.menuTab.delete({
      where: { id },
    });
  }
}
