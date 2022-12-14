import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class PaymentInput {
  @Prop()
  @IsNotEmpty()
  price: number;

  @Prop()
  @IsNotEmpty()
  id: string;

  @Prop()
  @IsNotEmpty()
  projectId: string;

  @Prop()
  @IsNotEmpty()
  days: number;
}
