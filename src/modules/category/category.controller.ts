import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { RoleEnum } from 'src/constants/enum';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/category.dto';

@Controller('category')
export class CategoryControllers {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Post('')
  async createCategory(@Body() input: CreateCategoryInput) {
    return await this.categoryService.createCategory(input);
  }
}
