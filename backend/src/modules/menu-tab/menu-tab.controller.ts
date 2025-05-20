import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Req, Patch } from '@nestjs/common';
import { MenuTabsService } from './menu-tab.service';
import { CreateMenuTabDto } from './dto/create-menu-tab.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
@Controller('api/admin/menu-tabs')
export class MenuTabsController {
  constructor(private readonly service: MenuTabsService) {}

  @Get()
  findAll(@Query('restaurantId') restaurantId: string) {
    return this.service.findAll(restaurantId);
  }

  @Post()
  create(@Body() dto: CreateMenuTabDto, @Req() req) {
    const restaurantId = req.user.restaurantId;
    return this.service.create(dto, restaurantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch('/order')
  updateOrder(@Body() body: { updates: { id: string; order: number }[] }) {
    return this.service.updateTabOrder(body.updates);
  }


}
