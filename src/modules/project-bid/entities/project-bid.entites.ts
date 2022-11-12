import { Prop } from '@nestjs/mongoose';
import { Bid } from 'src/modules/bid/entities/bid.entities';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IProjectBid } from '../interfaces/project-bid';

export class ProjectBid implements IProjectBid {
  @Prop()
  _id: string;

  @Prop()
  project: Project;

  @Prop()
  user: User;

  @Prop()
  bids: Bid[];

  @Prop()
  createAt: Date;

  @Prop()
  updateAt?: Date;

  @Prop()
  slug?: string;

  @Prop()
  keyword?: string;
}
