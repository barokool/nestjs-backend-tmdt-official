import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { FilterUser } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUserByEmail(email): Promise<User | undefined> {
    return this.userModel.findOne(email);
  }

  async comparePassword(password: string, hashedPassword: string) {
    const matchPassword = await bcrypt.compare(password, hashedPassword);
    if (!matchPassword) return false;
    return true;
  }

  async register(input: SignUpInput) {
    //check user is existed
    const { email } = input;
    const existedUser = await this.findByEmail(email);

    if (existedUser) throw new BadRequestException('User is already exitsted');

    //hash
    const password = input.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new this.userModel(input);
    newUser.password = hashedPassword;

    return await newUser.save();
  }

  async login(input: SignInInput) {
    //
    const { email, password } = input;
    const user = await this.findByEmail(email);
    const isMatchPassword = await this.comparePassword(password, user.password);

    if (!user || !isMatchPassword)
      throw new BadRequestException('Password or user is not correct');

    return user;
  }

  async getAllUser(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async getUserById(filter: FilterUser): Promise<User> {
    return this.userModel.findById(filter.id);
  }
}
