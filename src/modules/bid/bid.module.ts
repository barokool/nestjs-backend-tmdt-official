import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid } from './entities/bid.entities';
import { BidSchema } from './schema/bid.schema';
import { toKeyword, toSlug } from 'src/utils/string.utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Bid.name,
        useFactory: () => {
          BidSchema.pre('save', function (next) {
            this.slug = toSlug(this.project.name);
            this.keyword = toKeyword(this.slug);
            return next();
          });
          return BidSchema;
        },
      },
    ]),
  ],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
