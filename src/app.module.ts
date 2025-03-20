import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TestController } from './test/test.controller';


const typeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '192.168.10.52', 
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'antilavado',
  synchronize: true,
  autoLoadEntities: true,
  logging: true
});

@Module({
  imports: [typeOrm, UsuariosModule, AuthModule],
  controllers: [AppController, UsuariosController, AuthController, TestController],
  providers: [AppService, UsuariosService],
})
export class AppModule {}
