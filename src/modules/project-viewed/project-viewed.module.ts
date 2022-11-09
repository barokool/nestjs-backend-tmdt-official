import { Module } from '@nestjs/common';
import { ProjectViewedService } from './project-viewed.service';
import { ProjectViewedController } from './project-viewed.controller';

@Module({
  controllers: [ProjectViewedController],
  providers: [ProjectViewedService],
})
export class ProjectViewedModule {}
