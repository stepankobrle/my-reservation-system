import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Req
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
@Controller('api/admin/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll(@Query('menuTabId') menuTabId: string) {
    return this.menusService.findAll(menuTabId);
  }

  @Post()
  create(@Body() dto: CreateMenuDto, @Req() req) {
    const restaurantId = req.user.restaurantId;
    return this.menusService.create({ ...dto, restaurantId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
    return this.menusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
