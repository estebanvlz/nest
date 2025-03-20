import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermisosGuard } from '../auth/guards/permisos.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permisos } from '../auth/decorators/permisos.decorator';

@Controller('test')
export class TestController {
  
  @Get('rol')
  @UseGuards(RolesGuard)
  @Roles('SISTEMA_ADMIN')
  soloAdmins() {
    return { mensaje: 'Acceso permitido solo para administradores' };
  }

  @Get('permiso')
  @UseGuards(PermisosGuard)
  @Permisos('crear_usuario') 
  soloUsuariosConPermiso() {
    return { mensaje: 'Acceso permitido solo para usuarios con el permiso ver_reportes' };
  }
}
