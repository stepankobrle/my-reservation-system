import { IsOptional, IsString, IsUUID, IsISO8601 } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    type: string;

    @IsString()
    message: string;

    @IsUUID()
    restaurantId: string;

    @IsOptional()
    @IsUUID()
    guestId?: string;

    @IsOptional()
    @IsISO8601() // validuje ISO formát pro datum a čas
    reservationTime?: string;
}
