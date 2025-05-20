import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateMenuItemDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    category: string;

    @IsArray()
    allergens: number[];

    @IsString()
    menuId: string;

    @IsOptional()
    @IsNumber()
    order?: number;
}
