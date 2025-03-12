import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //limpiar los campos que no corresponden o que no se esperan
    }),
  ); //se hacen las validaciones para todas las rutas
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
