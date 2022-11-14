import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tags } from 'src/constants/enum';
import { CategoryService } from '../category/category.service';
import { User } from '../user/entities/user.entity';
import { CreateProjectInput, Project } from './entities/project.entity';
import { ProjectDocument } from './schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private categoryService: CategoryService,
  ) {}

  async createProject(input: CreateProjectInput, user: User) {
    const { category } = input;
    const newProject = new this.projectModel(input);

    const categoryFound = await this.categoryService.getCategory(category);
    newProject.isPayed = false;

    const tags: string[] = [Tags.IT];

    switch (categoryFound.name) {
      case 'Information Technology':
        tags.push(Tags.PROGRAMMING);
        break;
      case 'Web Programming':
        tags.push(Tags.WEB);
        break;
      case 'Mobile Programming':
        tags.push(Tags.MOBILE, Tags.SOFTWARE, Tags.IT);
        break;
      case 'Other Programming':
        tags.push(Tags.SOFTWARE, Tags.OTHER);
        break;
      case 'Software Programming':
        tags.push(Tags.SOFTWARE);
        break;
      case 'Search Engine Optimize - SEO':
        tags.push(Tags.SEO);
        break;
      case 'Network System Design':
        tags.push(Tags.NETWORK);
        break;
      case 'Embemded Programming':
        tags.push(Tags.EMBEMDED);
        break;
      case 'AI - Machine Learning':
        tags.push(Tags.AI);
        break;
    }

    newProject.tags = tags;
    newProject.createdBy = user;

    return await newProject.save();
  }

  async updateProject() {
    console.log('hi');
  }
}

/*
input : 
    {
    "category" : "636f6313d3504f1be30b2913",
    "name": "Reading Manga",
    "description": "I need to create a reading managa based on nettruyen",
    "postType": "NORMAL"
    }

response : {
    "name": "Reading Manga",
    "description": "I need to create a reading managa based on nettruyen",
    "postType": "NORMAL",
    "category": "636f6313d3504f1be30b2913",
    "tags": [
        "WEB"
    ],
    "createAt": "2022-11-14T09:40:34.648Z",
    "_id": "63720d2c04054287ee789063",
    "isPayed": false,
    "createdBy": {
        "_id": "636bc45eb9194011f42562a6",
        "email": "knabao7a7@gmail.com",
        "password": "$2b$10$YbIZgN5CUmDpaqnng75G/eXs86zAgK/HZqdZTh4MJL5SavgSZlPvW",
        "phone": "0935797800",
        "createdAt": "2022-11-09T15:16:46.730Z",
        "updatedAt": "2022-11-09T15:16:46.730Z",
        "__v": 0
    },
    "slug": "reading-manga",
    "keyword": "reading manga",
    "__v": 0
}
*/
