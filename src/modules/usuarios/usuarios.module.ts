import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';
import { Rol } from 'src/common/entities/usuarios/rol.entity';
import { Permiso } from 'src/common/entities/usuarios/permisos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Permiso])],
  exports: [UsuariosService],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
