import {
    IsString,
    IsOptional,
    ValidateNested,
    IsEmail,
    IsNumber,
    IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class GuestDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string; // ⬅️ bez `?` a bez `| null`
}

export class CreateReservationDto {
    @IsString()
    dateTime: string;

    @IsNumber()
    peopleCount: number;

    @IsString()
    restaurantId: string;

    @IsOptional()
    @IsString()
    tableId?: string | null;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsEnum(['PENDING', 'CONFIRMED'])
    status?: 'PENDING' | 'CONFIRMED';

    @ValidateNested()
    @Type(() => GuestDto)
    guest: GuestDto;
}
