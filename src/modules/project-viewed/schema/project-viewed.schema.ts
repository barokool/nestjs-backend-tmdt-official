import { Schema } from 'mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ProjectViewed } from '../entities/project-viewed.entites';

export type ProjectViewedDocument = ProjectViewed & Document;

export const ProjectViewedSchema = new Schema<ProjectViewed>({
  user: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: Project.name,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
