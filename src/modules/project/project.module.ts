import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { ProjectSchema } from './schema/project.schema';
import { toKeyword, toSlug } from 'src/utils/string.utils';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        useFactory: () => {
          ProjectSchema.pre('save', function (next) {
            this.slug = toSlug(this.name);
            this.keyword = toKeyword(this.slug);
            return next();
          });

          return ProjectSchema;
        },
      },
    ]),
    CategoryModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
