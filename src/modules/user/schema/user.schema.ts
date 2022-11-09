import { Document, Schema } from 'mongoose';
import { RoleEnum } from 'src/constants/enum';
import { User } from '../entities/user.entity';

export type UserDocument = User & Document;

export const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
    },
    avatar: {
      type: String,
    },
    walletAmount: {
      type: Number,
    },
    keyword: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
