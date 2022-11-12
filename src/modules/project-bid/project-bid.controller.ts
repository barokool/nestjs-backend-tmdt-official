import { Controller } from '@nestjs/common';
import { ProjectViewedService } from './project-bid.service';

@Controller('project-viewed')
export class ProjectViewedController {
  constructor(private readonly projectViewedService: ProjectViewedService) {}
}
