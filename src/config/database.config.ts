import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`ERROR: La variable de entorno ${name} no está definida`);
    }
    return value;
}
  
export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: getEnvVar('DATABASE_HOST'),
    port: parseInt(getEnvVar('DATABASE_PORT')),
    username: getEnvVar('DATABASE_USER'),
    password: getEnvVar('DATABASE_PASSWORD'),
    database: getEnvVar('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: true, // TODO: remover en Prod
};
  