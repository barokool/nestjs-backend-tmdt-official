import { Controller, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entites';

@Controller('category')
export class CategoryResolvers {
  constructor(private readonly categoryService: CategoryService) {}

  //
  // @Query(() => Category[])
  // async getAllCategory() {
  //   return await this.categoryService.getAllCategory();
  // }

  // @Post("")
}
