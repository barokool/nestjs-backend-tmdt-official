import { Prop } from '@nestjs/mongoose';
import { RoleEnum } from 'src/constants/enum';
import { IUser } from '../interfaces/user';

export class User implements IUser {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  phone: string;

  @Prop()
  role: RoleEnum;

  @Prop()
  avatar: string;

  @Prop()
  walletAmount: number;

  @Prop({ nullable: true, default: Date.now() })
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
