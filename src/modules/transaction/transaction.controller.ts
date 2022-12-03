import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { CreateTransactionInput } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthenticationGuard)
  @Get('')
  async getAllTransactionByUser(@CurrentUser() user: User) {
    return await this.transactionService.getAllTransactionByUser(user);
  }

  @UseGuards(AuthenticationGuard)
  @Post('')
  async createTransaction(
    @Body() input: CreateTransactionInput,
    @CurrentUser() user: User,
  ) {
    return await this.transactionService.createTransaction(input, user);
  }
}
