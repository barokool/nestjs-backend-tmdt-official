import { Prop } from '@nestjs/mongoose';
import { ICategory } from '../interfaces/category';

export class Category implements ICategory {
  @Prop()
  _id: string;

  @Prop()
  parent: Category;

  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  isDeleted?: boolean;

  @Prop({ nullable: true })
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
