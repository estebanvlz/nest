import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Antilavado')
    .setDescription('Endpoints descriptivos de la api del proyecto Ley Antilavado pd: tqm silman <3')
    .setVersion('1.0')
    // .addTag('cats')
    .build();