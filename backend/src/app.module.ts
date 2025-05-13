import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { GuestsModule } from './modules/guests/guests.module';
import { TablesModule } from './modules/tables/tables.module';
import { MenusModule } from './modules/menus/menus.module';
import { MenuItemsModule } from './modules/menu-items/menu-items.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CalendarModule } from './modules/calendar/calendar.module';

@Module({
  imports: [ProductsModule, CategoriesModule, RestaurantsModule, GuestsModule, TablesModule, MenusModule, MenuItemsModule, ReservationsModule, AuthModule, DashboardModule, NotificationsModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
