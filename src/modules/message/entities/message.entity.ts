import { Prop } from '@nestjs/mongoose';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IMessage } from '../interfaces/message';

export class Message implements IMessage {
  @Prop()
  _id: string;

  @Prop()
  conversation: Conversation;

  @Prop()
  text: string;

  @Prop()
  receiver: User;

  @Prop()
  sender: User;

  @Prop({ nullable: true })
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
