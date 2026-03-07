import { NestFactory } from '@nestjs/core';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { apply_global_config } from '@org/shared/setup-app';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  apply_global_config(app);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') as number;
  await app.listen(port);
}

bootstrap();
