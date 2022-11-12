import { Module } from '@nestjs/common';
import { ProjectViewedService } from './project-bid.service';
import { ProjectViewedController } from './project-bid.controller';

@Module({
  controllers: [ProjectViewedController],
  providers: [ProjectViewedService],
})
export class ProjectViewedModule {}
