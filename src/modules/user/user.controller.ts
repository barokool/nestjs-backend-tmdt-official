import { UserService } from './user.service';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
