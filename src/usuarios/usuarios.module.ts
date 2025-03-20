import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { PermisoEntity } from './entities/permiso.entity';
import { RolEntity } from './entities/rol.entity';

@Module({
    controllers: [UsuariosController],
    providers: [UsuariosService],
    imports: [TypeOrmModule.forFeature([UsuarioEntity, PermisoEntity, RolEntity])],
    exports: [],
})
export class UsuariosModule {}
