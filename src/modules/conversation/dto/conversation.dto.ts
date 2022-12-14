import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateConversationInput {
  @Prop()
  @IsNotEmpty()
  members: string[];
}
