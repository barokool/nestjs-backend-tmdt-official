import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { CreateMessageInput } from './dto/message.dto';
import { Message } from './entities/message.entity';
import { MessageDocument } from './schema/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private conversationService: ConversationService,
    private userService: UserService,
  ) {}

  async createMessage(input: CreateMessageInput) {
    const { conversation, receiver, sender, text } = input;

    try {
      const foundConversation = await this.conversationService.getConversation(
        conversation,
      );
      const foundReceiver = await this.userService.getUserById({
        id: receiver,
      });
      const foundSender = await this.userService.getUserById({ id: sender });
      if (
        foundConversation &&
        foundReceiver &&
        foundSender &&
        sender !== receiver
      ) {
        const newMessage = new this.messageModel({
          conversation: foundConversation,
          sender: foundSender,
          receiver: foundReceiver,
          text,
        });

        await foundConversation.update({
          $push: {
            messages: newMessage,
          },
        });

        await newMessage.save();
        await foundConversation.save();
        console.log('sent success');

        return foundConversation;
      }
      console.log('sent failed');

      return false;
    } catch (error) {
      throw new BadRequestException(`Cant create message because ${error}`);
    }
  }

  async getAllMessageByConversation(conversationId: string) {
    try {
      return await this.messageModel
        .find({
          conversation: conversationId,
        })
        .populate([
          {
            path: 'conversation',
          },
          {
            path: 'receiver',
          },
          {
            path: 'sender',
          },
        ])
        .exec();
    } catch (error) {
      throw new BadRequestException(
        `Cant get all message by conversation because ${error}`,
      );
    }
  }
}
