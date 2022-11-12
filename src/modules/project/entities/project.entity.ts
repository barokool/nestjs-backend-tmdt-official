import { Prop } from '@nestjs/mongoose';
import { PostType } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entites';
import { User } from 'src/modules/user/entities/user.entity';
import { IProject } from '../interfaces/project';

export class Project implements IProject {
  @Prop()
  _id: string;

  @Prop({ nullable: true })
  desc: string;

  @Prop()
  name: string;

  @Prop({ nullable: true })
  imageUrl: string;

  @Prop()
  postType: PostType;

  @Prop()
  category: Category;

  @Prop()
  isPayed: boolean;

  @Prop({ nullable: true })
  isCancled?: boolean;

  @Prop({ nullable: true })
  canceledReason?: string;

  @Prop({ nullable: true })
  canceledAt?: Date;

  @Prop()
  tags: string[];

  @Prop()
  publishAt: Date;

  @Prop()
  expireAt: Date;

  @Prop()
  isFinished: boolean;

  @Prop()
  finishedAt: Date;

  @Prop(() => User)
  createdBy: User;

  @Prop({ nullable: true })
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
