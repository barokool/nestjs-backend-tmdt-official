import { Category } from '../entities/category.entites';

export interface ICategory extends IEntity {
  parent: Category;
  name: string;
  icon: string;
}
