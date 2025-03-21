import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/common/entities/usuario.entity';
import { Rol } from 'src/common/entities/rol.entity';
import { Permiso } from 'src/common/entities/permisos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Permiso])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
