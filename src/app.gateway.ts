import { CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
import { BidService } from './modules/bid/bid.service';
import { CreateBidInput } from './modules/bid/dto/bid.dto';
import { ConnectionInput } from './modules/conversation/dto/conversation.dto';
import { CreateMessageInput } from './modules/message/dto/message.dto';
import { MessageService } from './modules/message/message.service';
import { sumCharCode } from './utils/string.utils';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private bidService: BidService,
    private messageService: MessageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    try {
      //cache id browser
      const socketSenderId = 'socket' + payload.sender;
      const socketReceiverId = 'socket' + payload.receiver;

      const [message, socketSender, socketReceiver] = await Promise.all([
        this.messageService.createMessage(payload),
        this.cacheManager.get(socketSenderId),
        this.cacheManager.get(socketReceiverId),
      ]);
      this.server.sockets.to(`${socketSender}`).emit('senderMessage', payload);
      this.server.sockets
        .to(`${socketReceiver}`)
        .emit('receiverMessage', payload);
      console.log('sender id : ', socketSenderId);
      console.log('receiver id : ', socketReceiverId);
      console.log('socket sender : ', socketSender);
      console.log('socket receiver : ', socketReceiver);

      return message;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  afterInit(server: any) {
    console.log('server ', server);
  }
  handleConnection(@ConnectedSocket() socket: Socket) {}
  handleDisconnect(client: any) {}

  @SubscribeMessage('verifyConnection')
  async verifyConnection(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: ConnectionInput,
  ) {
    try {
      let socketId = '';
      const socketKey = 'socket' + payload.userId;
      socketId = await this.cacheManager.get(socketKey);
      console.log('socketId1 :', socketId);

      if (!socketId) {
        socketId = socket.id;
        console.log('socketId2 :', socketId);
      }
      console.log('connceted with :');
      console.log({ socketId });
      await this.cacheManager.set(socketKey, socketId, 7 * 24 * 60 * 60);
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}

/**
 * problem : khi connect vào -> có id user : cache lại id user để làm socketId
 * send Message :  khi emit event, gán id user as socketId, tên event rồi sendMessage
 * but new problem : khi connect, ko có id user sao mà cache
 */
