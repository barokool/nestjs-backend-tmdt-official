import { Prop } from '@nestjs/mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ITransaction } from '../interfaces/transaction';

export class Transaction implements ITransaction {
  @Prop()
  _id: string;

  @Prop()
  project?: Project;

  @Prop()
  projectOwner?: User;

  @Prop()
  contractor?: User;

  @Prop()
  bidAmount?: number;

  @Prop()
  isDeleted?: boolean;

  @Prop()
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
