import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from '../../modules/usuarios/usuarios.service';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector, private usuariosService: UsuariosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredPermissions) {
      return true; // ✅ Si no hay permisos requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // const userPermissions = await this.usuariosService.obtenerPermisosUsuario(user.userId);

    // const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm));

    // if (!hasPermission) {
    //   throw new ForbiddenException('No tienes permisos para esta acción');
    // }

    return true;
  }
}
