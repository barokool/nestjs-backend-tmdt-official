import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BidService } from './modules/bid/bid.service';
import { CreateBidInput } from './modules/bid/dto/bid.dto';
import { CreateMessageInput } from './modules/message/dto/message.dto';
import { MessageService } from './modules/message/message.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private bidService: BidService,
    private messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: Socket, @MessageBody() payload: CreateBidInput) {
    await this.bidService.createBid(payload);

    this.server.sockets.emit('message', payload);
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    client: Socket,
    @MessageBody() payload: CreateMessageInput,
  ) {
    await this.messageService.createMessage(payload);

    this.server.sockets.emit('chatMessage', payload);
  }

  afterInit(server: any) {
    console.log('server ', server);
  }
  handleConnection(client: any, ...args: any[]) {}
  handleDisconnect(client: any) {}
}
