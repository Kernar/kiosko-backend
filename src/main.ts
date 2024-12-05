import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configurar CORS
    app.enableCors({
      origin: 'http://localhost:4200', // Aquí especificas el origen de tu frontend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });

  await app.listen(3000);
}
bootstrap();
