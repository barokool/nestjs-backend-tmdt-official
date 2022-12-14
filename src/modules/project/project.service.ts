import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tags } from 'src/constants/enum';
import { CategoryService } from '../category/category.service';
import { User } from '../user/entities/user.entity';
import { FilterProjectInput } from './dto/project.dto';
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
    console.log('his');
  }

  async getAllProjectByUser(user: User) {
    return await this.projectModel
      .find({
        createdBy: user._id,
      })
      .populate([{ path: 'createdBy' }])
      .exec();
  }

  async getAllProject(filterInput: FilterProjectInput) {
    const { keyword, page, limit } = filterInput;
    let filter = {};
    const currentDate = new Date();

    if (keyword) {
      filter = {
        slug: {
          $regex: keyword,
        },
        expireAt: {
          $gte: currentDate,
        },
      };
    }

    const count = await this.projectModel.countDocuments({
      expireAt: {
        $gte: new Date(),
      },
    });

    let projects = [];

    try {
      if (keyword) {
        projects = await this.projectModel
          .find({
            slug: {
              $regex: keyword,
            },
            expireAt: {
              $gte: new Date(),
            },
          })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate([{ path: 'createdBy' }])
          .exec();
      } else {
        projects = await this.projectModel
          .find({
            expireAt: {
              $gte: new Date(),
            },
          })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate([{ path: 'createdBy' }])
          .exec();
      }

      return {
        result: projects,
        count: count,
      };
    } catch (error) {
      return {
        result: [],
        count: 0,
      };
    }
  }

  async getProjectById(id: string) {
    return await this.projectModel.findById(id).exec();
  }

  async getProductBySlug(slug: string): Promise<any> {
    return await this.projectModel.find({ slug });
  }

  async getAllProjectByCategory(category: string) {
    try {
      const [projects, count] = await Promise.all([
        this.projectModel
          .find({ category })
          .populate([{ path: 'createdBy' }])
          .exec(),
        this.projectModel.countDocuments({ category }),
      ]);

      return { projects, count };
    } catch (error) {
      return {
        result: [],
        count: 0,
      };
    }
  }
}
