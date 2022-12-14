import { Prop } from '@nestjs/mongoose';
import { Message } from 'src/modules/message/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IConversation } from '../interfaces/conversation';

export class Conversation implements IConversation {
  @Prop()
  _id: string;

  @Prop()
  members: User[];

  @Prop()
  messages: Message[];

  @Prop({ nullable: true })
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
