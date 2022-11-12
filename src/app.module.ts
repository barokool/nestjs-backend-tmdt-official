import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ConfigurationService } from './configuration/configuration.service';
import { MongooseConfigService } from './configuration/mongoose.config';
import { AdminModule } from './modules/admin/admin.module';
import { BidModule } from './modules/bid/bid.module';
import { CategoryModule } from './modules/category/category.module';
import { ProjectViewedModule } from './modules/project-bid/project-bid.module';
import { ProjectModule } from './modules/project/project.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    PassportModule,
    AuthModule,
    UserModule,
    AdminModule,
    CategoryModule,
    ProjectModule,
    TransactionModule,
    BidModule,
    ProjectViewedModule,
  ],
  controllers: [],
  providers: [ConfigurationService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = this.configurationService.port as number;
  }
}
