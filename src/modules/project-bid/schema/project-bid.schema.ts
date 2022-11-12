import { Schema } from 'mongoose';
import { Bid } from 'src/modules/bid/entities/bid.entities';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ProjectBid } from '../entities/project-bid.entites';

export type ProjectViewedDocument = ProjectBid & Document;

export const ProjectViewedSchema = new Schema<ProjectBid>({
  user: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: Project.name,
  },
  bids: [{
    type: Schema.Types.ObjectId,
    ref: Bid.name,
  }],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
