import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    if (!usuario || !usuario.roles) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tieneRol = usuario.roles.some((rol: string) => requiredRoles.includes(rol));
    if (!tieneRol) {
      throw new ForbiddenException('No tienes los permisos necesarios');
    }

    return true;
  }
}
