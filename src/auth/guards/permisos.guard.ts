import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permisosRequeridos = this.reflector.get<string[]>('permisos', context.getHandler());
    if (!permisosRequeridos) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    if (!usuario || !usuario.permisos) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tienePermiso = usuario.permisos.some((permiso: string) => permisosRequeridos.includes(permiso));
    if (!tienePermiso) {
      throw new ForbiddenException('No tienes los permisos necesarios');
    }

    return true;
  }
}
