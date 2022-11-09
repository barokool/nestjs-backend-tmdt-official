import { RoleEnum } from 'src/constants/enum';

export interface IUser extends IEntity {
  email: string;
  password: string;

  fullName: string;
  phone: string;

  role: RoleEnum;

  avatar: string;

  walletAmount: number;
}

export type IUpdateUser = IEntityUpdate<IUser>;

export type ICreateUser = Omit<IUser>;
