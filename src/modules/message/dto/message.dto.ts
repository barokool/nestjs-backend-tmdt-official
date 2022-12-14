import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageInput {
  @Prop()
  @IsNotEmpty()
  text: string;

  @Prop()
  @IsNotEmpty()
  conversation: string;

  @Prop()
  @IsNotEmpty()
  sender: string;

  @Prop()
  @IsNotEmpty()
  receiver: string;
}
