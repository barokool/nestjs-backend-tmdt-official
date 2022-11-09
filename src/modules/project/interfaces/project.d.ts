import { PostType } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entites';
import { User } from 'src/modules/user/entities/user.entity';

export interface IProject extends IEntity {
  name: string;
  desc: string;
  imageUrl: string;
  postType: PostType;

  isCancled?: boolean;
  canceledReason?: string;
  canceledAt?: Date;

  category: Category;
  tags: string[];

  publishAt: Date;
  expireAt: Date;
  isFinished: boolean;
  finishedAt: Date;

  createdBy: User;
}
