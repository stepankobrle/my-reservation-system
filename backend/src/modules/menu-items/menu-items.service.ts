import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  findAll(menuId: string) {
    return this.prisma.menuItem.findMany({
      where: { menuId },
      orderBy: { order: 'asc' }, // místo category
    });
  }


  async create(dto: CreateMenuItemDto) {
    const lastItem = await this.prisma.menuItem.findFirst({
      where: { menuId: dto.menuId },
      orderBy: { order: 'desc' },
    });

    const nextOrder = lastItem ? lastItem.order + 1 : 1;

    return this.prisma.menuItem.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        allergens: dto.allergens,
        category: dto.category,
        menuId: dto.menuId,
        order: dto.order ?? nextOrder,
      },
    });
  }

  update(id: string, dto: UpdateMenuItemDto) {
    return this.prisma.menuItem.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
