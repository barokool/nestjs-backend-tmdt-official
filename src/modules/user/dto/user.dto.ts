import { Prop } from '@nestjs/mongoose';

export class FilterUser {
  @Prop()
  email?: string;

  @Prop()
  id?: string;
}

export class UpdateUserInput {
  @Prop()
  fullName?: string;

  @Prop()
  email?: string;

  @Prop()
  password: string;

  @Prop()
  phone?: string;
}

export class UpdateUserPassInput {
  password: string;
  newPassword: string;
}
