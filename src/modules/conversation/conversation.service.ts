import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { CreateConversationInput } from './dto/conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { ConversationDocument } from './schema/conversation.schema';

@Injectable()
export class ConversationService {
  logger = new Logger(ConversationService.name);
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async getAllConversation() {
    try {
      const [conversations, count] = await Promise.all([
        this.conversationModel.find().populate([{ path: 'members' }]),
        this.conversationModel.count(),
      ]);

      return {
        conversations,
        count,
      };
    } catch (error) {
      console.log('error', error);

      return {
        conversations: [],
        count: 0,
      };
    }
  }

  async getConversation(conversationId: string) {
    try {
      const conversation = await this.conversationModel.findById(
        conversationId,
      );
      return conversation;
    } catch (error) {
      throw new BadRequestException(
        `Error return from try catch block: ${error}`,
      );
    }
  }

  async createConversation(input: CreateConversationInput) {
    const { members } = input;

    const allConversations = await this.conversationModel.find({
      $or: [
        {
          members: [members[0], members[1]],
        },
        {
          members: [members[1], members[0]],
        },
      ],
    });
    if (allConversations.length > 0)
      throw new BadRequestException(
        `This conversation is already existed with ${allConversations.length}`,
      );
    const newConversation = new this.conversationModel({ members });
    return await newConversation.save();
  }

  async getConversationByMember(members: string[]) {
    try {
      const foundConversationn = await this.conversationModel.findOne({
        members,
      });

      return foundConversationn;
    } catch (error) {
      throw new BadRequestException(`Bad request from try catch block`);
    }
  }

  async getConversationByUserId(id: string) {
    try {
      const foundConversationn = await this.conversationModel
        .find({
          members: { $in: [id] },
        })
        .populate([{ path: 'messages' },{path : 'members'}]);

      return foundConversationn;
    } catch (error) {
      throw new BadRequestException(
        `Bad request from try catch block ${error}`,
      );
    }
  }
}
