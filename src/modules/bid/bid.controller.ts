import { Controller } from '@nestjs/common';
import { BidService } from './bid.service';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
}

//this model. used for a comment in an auction.
//mỗi một comment ra giá sẽ là 1 bid, table bid này có nghĩa là nơi chứa các comment thuộc theo từng id project
