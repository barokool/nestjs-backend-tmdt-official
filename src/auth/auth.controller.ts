import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async createUser(@Body() input: SignUpInput) {
    return await this.authService.createUser(input);
  }

  @Post('/signIn')
  async loginUser(@Body() input: SignInInput) {
    return await this.authService.loginUser(input);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/users')
  async getAllUser() {
    return await this.authService.getAllUSer();
  }

  @Get('/')
  async getUserByEmail(@Body() email: string, @Res() response: Response) {
    const user = await this.authService.getUserByEmail(email);
    if (user) {
      return response.status(HttpStatus.OK).json({
        user: <Partial<User>>{
          email: user.email,
          _id: user._id,
          phone: user.phone,
          avatar: user.avatar,
          fullName: user.fullName,
          role: user.role,
          walletAmount: user.walletAmount,
        },
      });
    }
    return response.status(HttpStatus.BAD_REQUEST).json({
      user: null,
    });
  }
}
