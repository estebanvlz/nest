import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Template')
    .setDescription('Template de la api, con autorizacion y auntenticacion')
    .setVersion('1.0')
    .build();