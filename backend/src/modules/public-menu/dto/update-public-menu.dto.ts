import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicMenuDto } from './create-public-menu.dto';

export class UpdatePublicMenuDto extends PartialType(CreatePublicMenuDto) {}
