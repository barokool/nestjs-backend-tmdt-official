import { Project } from 'src/modules/project/entities/project.entity';

export interface IBid extends IEntity {
  project: Project;
  amount: number;

  isCanceled?: boolean;
  canceledReason?: string;
  canceledAt?: Date;
  lastOnlineAt: Date;
}
