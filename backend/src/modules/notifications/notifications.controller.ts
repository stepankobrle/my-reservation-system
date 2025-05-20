import {
    Controller,
    Get,
    Query,
    Param,
    Patch,
    UseGuards,
    Post,
    Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
@Controller('api/admin/notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    getAll(@Query('restaurantId') restaurantId: string) {
        return this.notificationsService.findAllForRestaurant(restaurantId);
    }

    @Get('unread')
    getUnread(@Query('restaurantId') restaurantId: string) {
        return this.notificationsService.findUnread(restaurantId);
    }

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.createNotification(dto);
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.notificationsService.markAsRead(id);
    }
}
