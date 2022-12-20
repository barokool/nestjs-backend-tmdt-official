import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateConversationInput {
  @Prop()
  @IsNotEmpty()
  members: string[];
}

export class ConnectionInput {
  @Prop()
  userId: string;
}
