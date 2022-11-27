/*
 @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Bid): Promise<void> {
    await this.bidService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

*/

import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateBidInput {
  @Prop()
  @IsNotEmpty()
  amount: number;

  @Prop()
  @IsNotEmpty()
  projectId: string;

  @Prop()
  @IsNotEmpty()
  userId: string;
}
