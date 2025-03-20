import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new JwtAuthGuard(reflector));
  
    // app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Api')
      .setDescription('Api')
      .setVersion('1.0')
      .addTag('Api')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentacion', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
