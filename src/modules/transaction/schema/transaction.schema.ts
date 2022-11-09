import { Schema } from 'mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Transaction } from '../entities/transaction.entites';

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = new Schema<Transaction>({
  project: {
    type: Schema.Types.ObjectId,
    ref: Project.name,
  },
  projectOwner: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  bidAmount: {
    type: Number,
  },
  contractor: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
