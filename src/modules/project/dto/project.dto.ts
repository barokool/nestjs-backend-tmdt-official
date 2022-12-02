import { Prop } from '@nestjs/mongoose';

export class FilterProjectInput {
  @Prop()
  page: number;

  @Prop()
  limit: number;

  @Prop()
  keyword: string;
}
