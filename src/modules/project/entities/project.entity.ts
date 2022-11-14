import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { PostType } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entites';
import { User } from 'src/modules/user/entities/user.entity';
import { IProject } from '../interfaces/project';

export class Project implements IProject {
  @Prop()
  _id: string;

  @Prop()
  description: string;

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

  @Prop()
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

export class CreateProjectInput {
  @Prop()
  @IsNotEmpty()
  category: string;

  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsNotEmpty()
  description: string;

  @Prop()
  @IsNotEmpty()
  postType: PostType;

  @Prop()
  isPayed: boolean;

  @Prop()
  // @IsNotEmpty()
  tags: string[];

  @Prop()
  publishAt: Date;

  @Prop()
  expireAt: Date;

  @Prop()
  // @IsNotEmpty()
  createdBy: User;
}
