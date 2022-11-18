import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { IJWTPayload } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { responseHandler } from 'src/utils/response';
import { ConfigService } from '@nestjs/config';
import { RoleEnum } from 'src/constants/enum';
import { User } from 'src/modules/user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(input: SignUpInput) {
    const user = await this.userService.register(input);

    return responseHandler(user, HttpStatus.OK, 'create success');
  }

  async loginUser(input: SignInInput) {
    const user = await this.userService.login(input);

    if (user) {
      const payload: IJWTPayload = {
        _id: user._id,
        email: user.email,
        role: RoleEnum.USER,
      };

      const returnPayload: { id: string; accessToken: string } = {
        id: payload._id,
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '30d',
          secret: process.env.SECRET_KEY,
        }),
      };

      return responseHandler(
        user,
        HttpStatus.OK,
        'login success',
        returnPayload,
      );
    }

    return responseHandler(user);
  }

  async getAllUSer() {
    return await this.userService.getAllUser();
  }

  async getUserByEmail(user: User) {
    const { email } = user;
    return await this.userService.getUserByEmail(email);
  }

  async getUserById(id: string) {
    return await this.userService.getUserById({ id: id });
  }

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    const passwordValid = await this.userService.comparePassword(
      password,
      user.password,
    );

    if (user && passwordValid) {
      return user;
    }
    return null;
  }
}
