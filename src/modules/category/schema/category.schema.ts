import { Schema } from 'mongoose';
import { Category } from '../entities/category.entites';

export type CategoryDocument = Category & Document;

export const CategorySchema = new Schema<Category>({
  parent: {
    type: Schema.Types.ObjectId,
    ref: Category.name,
  },
  name: {
    type: String,
    unique: true,
  },
  icon: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  keyword: {
    type: String,
  },
  slug: {
    type: String,
  },
  updateAt: {
    type: Date,
  },
});
