import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/auth/jwt-auth.guard';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
