import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IProjectViewed extends IEntity {
  user: User;
  project: Project;
}
