import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './entities/category.entites';
import { CategorySchema } from './schema/category.schema';
import { CategoryControllers } from './category.controller';
import { toKeyword, toSlug } from 'src/utils/string.utils';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          CategorySchema.pre('save', function (next) {
            this.slug = toSlug(this.name);
            this.keyword = toKeyword(this.slug);
            return next();
          });

          return CategorySchema;
        },
      },
    ]),
    AdminModule,
  ],
  providers: [CategoryService, CategoryControllers],
  controllers: [CategoryControllers],
  exports: [CategoryService],
})
export class CategoryModule {}
