import { IMessage } from 'src/modules/message/interfaces/message';
import { IUser } from 'src/modules/user/interfaces/user';

export interface IConversation extends IEntity {
  members: IUser[];
  messages: IMessage[];
}
