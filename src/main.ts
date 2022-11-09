import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();
  await app.listen(AppModule.port);
}
bootstrap();
