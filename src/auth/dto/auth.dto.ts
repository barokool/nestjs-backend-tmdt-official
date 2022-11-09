import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class BaseUser {
  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SignUpInput extends BaseUser {
  @Prop()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop(() => String)
  @IsNotEmpty()
  phone: string;
}

export class SignInInput extends BaseUser {
  @Prop()
  @IsNotEmpty()
  password: string;
}
