import {
  ValidationPipe,
  BadRequestException,
  INestApplication,
} from '@nestjs/common';

export function apply_global_config(app: INestApplication) {
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = Object.values(err.constraints || {});
          return `${err.property}: ${constraints.join(', ')}`;
        });
        return new BadRequestException(messages.join('; '));
      },
    }),
  );
}
