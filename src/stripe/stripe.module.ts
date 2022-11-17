import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ProjectModule } from 'src/modules/project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
