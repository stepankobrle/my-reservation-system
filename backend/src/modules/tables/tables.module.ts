import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PrismaModule } from '../../../prisma/prisma.module'; // cesta podle struktury

@Module({
  imports: [PrismaModule], // ← přidat sem
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
