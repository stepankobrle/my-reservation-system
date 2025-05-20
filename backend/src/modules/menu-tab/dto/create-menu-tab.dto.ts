import {IsString, IsNumber, IsOptional} from "class-validator";

export class CreateMenuTabDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    order?: number;
}
