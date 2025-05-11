import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// @ts-ignore
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository{
    constructor(private readonly prisma: PrismaService) {}

    findAllByCompany(companyId: number): Promise<Category[]> {
        return this.prisma.category.findMany({
            where: { companyId },
        });
    }

    findOne(categoryId: number): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: {
                id:categoryId
            },
        });
    }

    async create(categoryData: CreateCategoryDto, companyId: number): Promise<Category> {
        return this.prisma.category.create({
            data: {
                name:categoryData.name,
                description:categoryData.description,
                companyId:companyId
            },
        });
    }

    async update(categoryData: UpdateCategoryDto & { companyId: number, categoryId: number }): Promise<Category> {
        return this.prisma.category.update({
            where:{
                id:categoryData.categoryId
            },
            data:{
                name:categoryData.name,
                description:categoryData.description,
                companyId:categoryData.companyId
            },
        });
    }

    async delete(categoryId: number): Promise<Category> {
        return this.prisma.category.delete({
            where:{
                id:categoryId

            },
        });
    }
}