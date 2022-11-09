import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Category } from '../entities/category.entites';

export class CreateCategoryInput {
  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  parent: Category;

  @Prop()
  icon: string;
}
