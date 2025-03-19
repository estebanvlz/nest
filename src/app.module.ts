import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';


const typeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '192.168.10.52', 
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'antilavado',
  synchronize: true, // Quitar en PROD.
  autoLoadEntities: true,
  logging: true
});

@Module({
  imports: [AuthModule, UsersModule, typeOrm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
