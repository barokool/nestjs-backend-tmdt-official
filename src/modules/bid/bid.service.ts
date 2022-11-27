import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectService } from '../project/project.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateBidInput } from './dto/bid.dto';
import { Bid } from './entities/bid.entities';
import { BidDocument } from './schema/bid.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel(Bid.name) private bidModel: Model<BidDocument>,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  async createBid(input: CreateBidInput) {
    const { amount, projectId, userId } = input;

    const project = await this.projectService.getProjectById(projectId);
    const user = await this.userService.getUserById({ id: userId });
    if (project && user) {
      const newBid = new this.bidModel({
        amount,
        project,
        user,
      });
      await newBid.save();
      return true;
    }

    throw new BadRequestException('Something wrong, please try again');
  }

  async getAllBid(projectId: string) {
    return this.bidModel.find({
      project: projectId,
    });
  }
}
