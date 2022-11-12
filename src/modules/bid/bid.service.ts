import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid } from './entities/bid.entities';
import { BidDocument } from './schema/bid.schema';

@Injectable()
export class BidService {
  constructor(@InjectModel(Bid.name) private bidModel: Model<BidDocument>) {}
}
