import { IConversation } from 'src/modules/conversation/interfaces/conversation';
import { IUser } from 'src/modules/user/interfaces/user';

export interface IMessage extends IEntity {
  text: string;
  conversation: IConversation;
  receiver: IUser;
  sender: IUser;
}
