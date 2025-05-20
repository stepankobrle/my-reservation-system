import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString , IsNumber} from 'class-validator';

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    menuTabId: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    order?: number;

}
