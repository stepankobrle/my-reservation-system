// tables.service.ts
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async findAll(restaurantId: string) {
    return this.prisma.table.findMany({
      where: { restaurantId },
      orderBy: { number: 'asc' },
    });
  }

  async create(dto: CreateTableDto) {
    console.log('📥 DTO při vytváření stolu:', dto);
    const exists = await this.prisma.table.findFirst({
      where: {
        restaurantId: dto.restaurantId,
        number: dto.number,
      },
    });
    console.log('🔍 Výsledek kontroly existence:', exists); // ✅ přidej i toto
    if (exists) {
      throw new BadRequestException('Stůl s tímto číslem již existuje v této restauraci.');
    }

    return this.prisma.table.create({ data: dto });
  }



  async update(id: string, dto: UpdateTableDto) {
    const existing = await this.prisma.table.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Stůl nenalezen');
    }
    // kontrola duplicity čísla stolu v rámci stejné restaurace
    if (dto.number) {
      const conflict = await this.prisma.table.findFirst({
        where: {
          restaurantId: existing.restaurantId,
          number: dto.number,
          NOT: { id }, // neporovnává se sám se sebou
        },
      });
      if (conflict) {
        throw new BadRequestException('Stůl s tímto číslem již existuje v této restauraci.');
      }
    }

    return this.prisma.table.update({
      where: { id },
      data: dto,
    });
  }


  async remove(id: string) {
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException('Stůl nenalezen');

    return this.prisma.table.delete({ where: { id } });
  }
}