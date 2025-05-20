import { Module } from '@nestjs/common';
import { MenuTabsService } from './menu-tab.service';
import { MenuTabsController } from './menu-tab.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [MenuTabsController],
  providers: [MenuTabsService, PrismaService],
  exports: [MenuTabsService],
})
export class MenuTabModule {}

