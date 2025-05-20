import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {
    @IsInt()
    number: number;

    @IsInt()
    capacity: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsString()
    restaurantId: string;
}
