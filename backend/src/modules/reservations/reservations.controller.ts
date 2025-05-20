// reservation.controller.ts (admin + public rozdělení)
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
    Req,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AvailableTimesDto } from './dto/available-times.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Request } from 'express';


// 🔐 ADMIN část
@Controller('api/admin/reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('EMPLOYEE')
export class AdminReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any; // doporučeno typovat správně
    return this.reservationService.findAll(user.restaurantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateReservationDto) {
    return this.reservationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }

  @Get('/tables')
  findTables(@Query('restaurantId') restaurantId: string) {
    return this.prisma.table.findMany({
      where: {restaurantId},
      orderBy: {number: 'asc'},
    });
  }

    @Get('available-tables')
    getAvailableTables(@Query() dto: AvailableTimesDto) {
        return this.reservationService.getAvailableTables(dto.restaurantId, dto.date, dto.peopleCount);
    }

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.createReservation(dto);
  }

}

// 🌐 PUBLIC část
@Controller('api/public/reservations')
export class PublicReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('available-times')
  getAvailableTimes(@Query() dto: AvailableTimesDto) {
    return this.reservationService.getAvailableTimes(dto);
  }

  @Post()
  createReservation(@Body() dto: CreateReservationDto) {
    return this.reservationService.createReservation(dto);
  }

  @Get('manage')
  getByToken(@Query('token') token: string) {
    return this.reservationService.findByToken(token);
  }

  @Patch('manage')
  updateByToken(@Query('token') token: string, @Body() dto: CreateReservationDto) {
    return this.reservationService.updateByToken(token, dto);
  }

  @Delete('manage')
  deleteByToken(@Query('token') token: string) {
    return this.reservationService.removeByToken(token);
  }
}

