import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // 💥 Díky tomu budou query parametry správně přetypované
        whitelist: true, // odstraní nevalidní properties
      }),
  );

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // nebo port, kde běží tvoje frontend appka
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
