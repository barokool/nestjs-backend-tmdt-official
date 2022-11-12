import { Schema } from 'mongoose';
import { PostType } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entites';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from '../entities/project.entity';

export type ProjectDocument = Project & Document;

export const ProjectSchema = new Schema<Project>({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  postType: {
    type: String,
    enum: Object.values(PostType),
  },
  isPayed: {
    type: Boolean,
  },
  isCancled: {
    type: Boolean,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category.name,
  },
  tags: {
    type: [String],
  },
  publishAt: {
    type: Date,
  },
  expireAt: {
    type: Date,
  },
  isFinished: {
    type: Boolean,
  },
  finishedAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
  },
  keyword: {
    type: String,
  },
  updateAt: {
    type: Date,
  },
});
