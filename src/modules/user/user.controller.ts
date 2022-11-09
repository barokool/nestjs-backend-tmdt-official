import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
