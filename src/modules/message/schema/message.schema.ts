import { Schema } from 'mongoose';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Message } from '../entities/message.entity';

export type MessageDocument = Message & Document;

export const MessageSchema = new Schema<Message>({
  text: {
    type: String,
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: Conversation.name,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
