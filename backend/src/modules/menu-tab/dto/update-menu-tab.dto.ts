import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuTabDto } from './create-menu-tab.dto';

export class UpdateMenuTabDto extends PartialType(CreateMenuTabDto) {}
