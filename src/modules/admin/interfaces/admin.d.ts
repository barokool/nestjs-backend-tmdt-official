import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';

export interface IAdmin extends IEntity {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  role?: RoleEnum;
  permissions?: AdminPermissionEnum;
}
