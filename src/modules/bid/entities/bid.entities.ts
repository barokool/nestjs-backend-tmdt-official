import { Prop } from '@nestjs/mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { IBid } from '../interfaces/bid';

export class Bid implements IBid {
  @Prop()
  _id: string;

  @Prop()
  project: Project;

  @Prop()
  amount: number;

  @Prop()
  isCanceled?: boolean;

  @Prop()
  canceledReason?: string;

  @Prop()
  canceledAt?: Date;

  @Prop()
  lastOnlineAt: Date;

  @Prop({ defaultValue: Date.now() })
  createAt: Date;

  @Prop()
  isDeleted?: boolean;

  @Prop()
  keyword?: string;

  @Prop()
  slug?: string;

  @Prop()
  updateAt?: Date;
}
