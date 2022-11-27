import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { BidService } from './bid.service';
import { CreateBidInput } from './dto/bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  // @UseGuards(AuthenticationGuard)
  // @Post('')
  // async postBid(@Body() input: CreateBidInput) {
  //   return await this.bidService.createBid(input);
  // }

  @Get('/:_id')
  async getAllBid(@Param('_id') _id: string) {
    return await this.bidService.getAllBid(_id);
  }
}

//this model. used for a comment in an auction.
//mỗi một comment ra giá sẽ là 1 bid, table bid này có nghĩa là nơi chứa các comment thuộc theo từng id project
