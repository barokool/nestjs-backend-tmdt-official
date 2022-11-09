import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/category.dto';
import { Category } from './entities/category.entites';
import { CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategory() {
    return await this.categoryModel.find().exec();
  }

  async createCategory(input: CreateCategoryInput) {
    const newCategory = new this.categoryModel(input);

    if (!newCategory)
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Something is wrong',
      );

    return await newCategory.save();
  }
}
