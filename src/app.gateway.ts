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

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private bidService: BidService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: Socket, @MessageBody() payload: CreateBidInput) {
    await this.bidService.createBid(payload);

    this.server.sockets.emit('message', payload);
  }

  afterInit(server: any) {
    console.log('server ', server);
  }
  handleConnection(client: any, ...args: any[]) {}
  handleDisconnect(client: any) {}
}
