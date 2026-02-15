import { NestFactory } from '@nestjs/core';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ScheduleService } from './schedule/schedule.service';
import { ShiftType } from '@org/shared/db';

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
  //   const scheduleService = app.get(ScheduleService);
  //   scheduleService._get_available_slots(1, '2026-02-16', ShiftType.MORNING);
}

bootstrap();
