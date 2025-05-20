import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('EMPLOYEE', 'MANAGER', 'ADMIN')
@Controller('api/admin/calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Get()
    getCalendarView(
        @Query('restaurantId') restaurantId: string,
        @Query('date') date: string,
    ) {
        return this.calendarService.getCalendarView(restaurantId, date);
    }
}
