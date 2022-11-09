import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/modules/admin/admin.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JsonWebTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
