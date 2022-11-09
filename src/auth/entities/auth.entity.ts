import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'src/constants/enum';
import { User } from 'src/modules/user/entities/user.entity';

export class IJWTPayload {
  @Prop()
  @IsNotEmpty()
  _id: string;

  @Prop()
  @IsNotEmpty()
  role: RoleEnum;

  @Prop()
  @IsNotEmpty()
  email: string;
}

export class JWTPayload {
  @Prop()
  accessToken?: string;

  @Prop(() => User)
  userInfo?: User;

  @Prop(() => IJWTPayload)
  payload?: IJWTPayload;
}

export class ResponseType {
  @Prop()
  statusCode: number;

  @Prop()
  msg: string;
}

export class AuthenResponseType extends ResponseType {
  @Prop(() => String)
  id?: string;

  @Prop(() => String)
  accessToken?: string;
}
