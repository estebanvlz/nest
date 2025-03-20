import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Permiso } from './interfaces/permiso.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('usuarios')
@Public()
@UseGuards(RolesGuard)
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService){}


    @Get('usuarios')
    async usuarios(){
        return this.usuariosService.obtenerUsuarios();
    }

    @Get('permisos')
    async permisos(){
        return this.usuariosService.obtenerPermisosPorModulo("asdasfa_usuario");
    }

    @Get('roles')
    async roles(){
        return this.usuariosService.obtenerRolesPorModulo("usuarios_asdaf");
    }


    @Get('permisos-usuario')
    // @Roles('usuarios_admin')
    async permisosUsuarios(){
        return this.usuariosService.obtenerPermisosUsuario(3);
    }

}
