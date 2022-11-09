import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface ITransaction extends IEntity {
  project?: Project;
  projectOwner?: User;
  contractor?: User;
  bidAmount?: number;
}
