import { Controller } from '@nestjs/common';
import { ProjectViewedService } from './project-viewed.service';

@Controller('project-viewed')
export class ProjectViewedController {
  constructor(private readonly projectViewedService: ProjectViewedService) {}
}
