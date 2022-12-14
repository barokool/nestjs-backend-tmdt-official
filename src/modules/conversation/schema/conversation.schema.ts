import { Schema } from 'mongoose';
import { Message } from 'src/modules/message/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';

export type ConversationDocument = Conversation & Document;

export const ConversationSchema = new Schema<Conversation>({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: User.name,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: Message.name,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
