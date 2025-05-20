import { Controller, Get, Param } from '@nestjs/common';
import { PublicMenuService } from './public-menu.service';

@Controller('api/public/menus')
export class PublicMenuController {
  constructor(private readonly service: PublicMenuService) {}

  @Get(':restaurantId')
  getMenus(@Param('restaurantId') restaurantId: string) {
    return this.service.getMenusForRestaurant(restaurantId);
  }
}
