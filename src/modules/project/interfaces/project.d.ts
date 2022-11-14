import { PostType } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entites';
import { User } from 'src/modules/user/entities/user.entity';

export interface IProject extends IEntity {
  category: Category;

  name: string;
  description: string;
  imageUrl: string;
  postType: PostType;

  isPayed: boolean;

  isCancled?: boolean;
  canceledReason?: string;
  canceledAt?: Date;

  tags: string[];

  publishAt: Date;
  expireAt: Date;
  isFinished: boolean;
  finishedAt: Date;

  createdBy: User;
}
