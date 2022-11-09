import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { AuthenResponseType, ResponseType } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => ResponseType)
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
}
