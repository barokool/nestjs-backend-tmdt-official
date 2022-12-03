import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Transaction } from '../entities/transaction.entites';

export class CreateTransactionInput {
  @Prop()
  @IsNotEmpty()
  projectId: string;

  @Prop()
  @IsNotEmpty()
  bidAmount: number;

  @Prop()
  @IsNotEmpty()
  contractorId: string;
}
