import { IsString, IsOptional, IsInt, IsDate, IsPositive } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    positionId?: number;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}