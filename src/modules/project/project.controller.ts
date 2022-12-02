import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { FilterProjectInput } from './dto/project.dto';
import { CreateProjectInput } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthenticationGuard)
  @Post('')
  async createProject(
    @Body() input: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return await this.projectService.createProject(input, user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('')
  async getProjectByUser(@CurrentUser() user: User) {
    return await this.projectService.getAllProjectByUser(user);
  }

  @Get('all')
  async getAllProjects(@Query() filter: FilterProjectInput) {
    return await this.projectService.getAllProject(filter);
  }

  @Get('/:slug')
  async getProjectBySlug(@Param('slug') slug: string) {
    return await this.projectService.getProductBySlug(slug);
  }
}
