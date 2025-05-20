import { IsDateString, IsInt, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class AvailableTimesDto {
    @IsDateString()
    date: string; // např. "2025-05-19"

    @IsInt()
    @Type(() => Number) // 💥 tohle převede peopleCount ze string na číslo
    peopleCount: number;

    @IsUUID()
    restaurantId: string;
}
