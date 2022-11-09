import { Schema } from 'mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { Bid } from '../entities/bid.entities';

export type BidDocument = Bid & Document;

export const BidSchema = new Schema<Bid>({
  project: {
    type: Schema.Types.ObjectId,
    ref: Project.name,
  },
  amount: {
    type: Number,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  canceledReason: {
    type: String,
  },
  canceledAt: {
    type: Date,
  },
  lastOnlineAt: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
  },
  updateAt: {
    type: Date,
  },
});
