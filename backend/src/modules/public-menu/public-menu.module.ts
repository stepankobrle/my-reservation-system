import { PublicMenuController } from './public-menu.controller';
import { PublicMenuService } from './public-menu.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {MenusService} from "../menus/menus.service";
import { MenusController } from '../menus/menus.controller';

@Module({
  controllers: [
    MenusController,
    PublicMenuController, // ✅
  ],
  providers: [
    MenusService,
    PublicMenuService,   // ✅
    PrismaService,
  ],
})
export class PublicMenuModule {}
