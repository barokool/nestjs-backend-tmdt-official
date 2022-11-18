import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectService } from 'src/modules/project/project.service';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private projectService: ProjectService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  async payForProject(
    price: number,
    id: string,
    projectId: string,
    days: number,
  ) {
    const payment = await this.stripe.paymentIntents.create({
      amount: price,
      currency: 'USD',
      payment_method: id,
      confirm: true,
      // customer: projectId,
    });
    if (payment) {
      const projectFound = await this.projectService.getProjectById(projectId);
      if (projectFound && !projectFound.isPayed) {
        projectFound.isPayed = true;
        //start date
        const startDate = new Date();
        projectFound.publishAt = startDate;

        //end date
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        projectFound.expireAt = endDate;

        return await projectFound.save();
      }
    } else
      throw new HttpException(
        'This payment is not success',
        HttpStatus.BAD_REQUEST,
      );
  }
}
