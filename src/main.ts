import { NestFactory } from '@nestjs/core';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        logger.error(JSON.stringify(errors, null, 2));
        return new BadRequestException(errors);
      },
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') as number;
  await app.listen(port);
}

bootstrap();
