import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './entities/category.entites';
import { CategorySchema } from './schema/category.schema';
import { CategoryResolvers } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService, CategoryResolvers],
})
export class CategoryModule {}
