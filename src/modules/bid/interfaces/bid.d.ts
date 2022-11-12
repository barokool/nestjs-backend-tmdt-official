import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IBid extends IEntity {
  project: Project;
  user: User;
  amount: number;

  isCanceled?: boolean;
  canceledReason?: string;
  canceledAt?: Date;
  lastOnlineAt: Date;
}
