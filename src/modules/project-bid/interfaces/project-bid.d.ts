import { Bid } from 'src/modules/bid/entities/bid.entities';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IProjectBid extends IEntity {
  user: User;
  project: Project;
  bids: Bid[];
}
