import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
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
  async getAllProjects() {
    return await this.projectService.getAllProject();
  }
}
