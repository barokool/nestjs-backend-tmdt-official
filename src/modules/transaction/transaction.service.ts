import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectService } from '../project/project.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateTransactionInput } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entites';
import { TransactionDocument } from './schema/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  async getAllTransactionByUser(user: User) {
    try {
      const [transactions, totalTransaction] = await Promise.all([
        this.transactionModel
          .find({
            contractor: user._id,
          })
          .populate([
            { path: 'project' },
            { path: 'projectOwner' },
            { path: 'contractor' },
          ])
          .exec(),
        this.transactionModel.count({
          contractor: user._id,
        }),
      ]);

      let cloneTransactions = [...transactions];

      cloneTransactions = cloneTransactions.map((transaction) => {
        transaction.projectOwner['password'] = undefined;
        transaction.contractor['password'] = undefined;

        return transaction;
      });

      return { result: cloneTransactions, count: totalTransaction };
    } catch (error) {
      console.log('error', error);
      return { result: [], count: 0 };
    }
  }

  async createTransaction(input: CreateTransactionInput, projectOwner: User) {
    console.log('Work');

    const { bidAmount, contractorId, projectId } = input;

    try {
      const foundContractor = await this.userService.getUserById({
        id: contractorId,
      });
      const foundProject = await this.projectService.getProjectById(projectId);

      if (
        foundContractor &&
        foundProject &&
        JSON.parse(JSON.stringify(foundProject.createdBy)) ===
          JSON.parse(JSON.stringify(projectOwner._id))
      ) {
        const transaction = new this.transactionModel({
          project: foundProject,
          contractor: foundContractor,
          projectOwner,
          bidAmount,
        });

        return await transaction.save();
      }
      throw new BadRequestException(
        'Something wrong! This is message return by Baro gia',
      );
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Error return from trycatch block');
    }
  }
}
