import { Prop } from '@nestjs/mongoose';
import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';
import { IAdmin } from '../interfaces/admin';

export class Admin implements IAdmin {
  @Prop()
  _id: string;

  @Prop()
  fullName?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  password?: string;

  @Prop()
  role?: RoleEnum;

  @Prop()
  permissions?: AdminPermissionEnum;

  @Prop()
  updateAt: Date;

  @Prop({ default: Date.now() })
  createAt: Date;
}
