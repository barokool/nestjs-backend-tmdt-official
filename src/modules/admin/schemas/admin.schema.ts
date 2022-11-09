import { Schema } from 'mongoose';
import { PermissionEnum, RoleEnum } from 'src/constants/enum';
import { Admin } from '../entities/admin.entity';

export type AdminDocument = Admin & Document;

export const AdminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    permissions: {
      type: String,
      enum: Object.values(PermissionEnum),
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
    },
    phone: {
      type: String,
      trim: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
