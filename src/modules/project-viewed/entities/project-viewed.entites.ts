import { Prop } from '@nestjs/mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IProjectViewed } from '../interfaces/project-viewed';

export class ProjectViewed implements IProjectViewed {
  @Prop()
  _id: string;

  @Prop()
  project: Project;

  @Prop(() => User)
  user: User;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt?: Date;

  @Prop()
  slug?: string;

  @Prop()
  keyword?: string;
}
