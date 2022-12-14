import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(AuthenticationGuard)
  @Get('/byUser')
  async getByUser(@CurrentUser() user: User) {
    return await this.conversationService.getConversationByUserId(user._id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('')
  async createConversation(@Body() input: CreateConversationInput) {
    return await this.conversationService.createConversation(input);
  }

  @UseGuards(AuthenticationGuard)
  @Get('all')
  async getAllConversation() {
    return await this.conversationService.getAllConversation();
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async getConversation(@Param('id') conversationId: string) {
    return await this.conversationService.getConversation(conversationId);
  }

  @UseGuards(AuthenticationGuard)
  @Get('byMembers/:id')
  async getByMembers(@Param('id') id: string) {
    const newIds = id.split('-');
    const members = [newIds[0], newIds[1]];
    return await this.conversationService.getConversationByMember(members);
  }
}
