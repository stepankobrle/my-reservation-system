import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  findAll(menuTabId: string) {
    return this.prisma.menu.findMany({
      where: { menuTabId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateMenuDto & { restaurantId: string }) {
    if (dto.isActive ?? true) {
      const activeExists = await this.prisma.menu.findFirst({
        where: {
          menuTabId: dto.menuTabId,
          isActive: true,
        },
      });

      if (activeExists) {
        throw new BadRequestException(
            'V tomto menu tabu už existuje aktivní menu. Deaktivuj ho před vytvořením nového.'
        );
      }
    }

    // najít nejvyšší order v rámci menuTabu
    const lastMenu = await this.prisma.menu.findFirst({
      where: { menuTabId: dto.menuTabId },
      orderBy: { order: 'desc' },
    });

    const nextOrder = lastMenu ? lastMenu.order + 1 : 1;

    return this.prisma.menu.create({
      data: {
        name: dto.name,
        isActive: dto.isActive ?? true,
        menuTabId: dto.menuTabId,
        restaurantId: dto.restaurantId,
        order: nextOrder,
      },
    });
  }



  async update(id: string, dto: UpdateMenuDto) {
    // pokud chceš změnit na aktivní menu
    if (dto.isActive === true) {
      // zjisti tab, do kterého menu patří
      const current = await this.prisma.menu.findUnique({
        where: { id },
        select: { menuTabId: true },
      });

      if (!current || !current.menuTabId) {
        throw new BadRequestException('Menu nebo menuTab nebyl nalezen.');
      }

      // zkontroluj, zda už jiné aktivní menu existuje ve stejném tabu
      /*
      const activeExists = await this.prisma.menu.findFirst({
        where: {
          menuTabId: current.menuTabId,
          isActive: true,
          NOT: { id }, // vyloučíme právě upravované menu
        },
      });

      if (activeExists) {
        throw new BadRequestException(
          'V tomto menu tabu už existuje jiné aktivní menu.'
        );
      }
      */
    }

    // aktualizace menu (ať už se mění jakékoliv pole)
    return this.prisma.menu.update({
      where: { id },
      data: dto,
    });
  }


  remove(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}

