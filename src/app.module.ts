import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { config } from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
config();



@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig), 
    AuthModule, UsuariosModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    ClientesModule,
    EmpresasModule 
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
