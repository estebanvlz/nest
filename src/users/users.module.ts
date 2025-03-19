import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsuarioSchema } from './schemas/usuario.schema';
// import { RolSchema } from './schemas/rol.schema';
// import { PermisoSchema } from './schemas/permiso.schema';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { Permiso } from './entities/permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Permiso])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}