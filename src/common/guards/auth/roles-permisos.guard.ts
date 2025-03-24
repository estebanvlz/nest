import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../../decorators/roles.decorator'
  import { PERMISSIONS_KEY } from '../../decorators/permisos.decorator'
  
  @Injectable()
  export class RolesPermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new ForbiddenException('Usuario no autenticado');
      }
  
      const userRoles = user.roles || [];
      const userPermissions = user.permisos || [];
  
      const hasRole = !requiredRoles || requiredRoles.some(role => userRoles.includes(role));
      const hasPermission = !requiredPermissions || requiredPermissions.some(p => userPermissions.includes(p));
  
      if (requiredRoles && requiredPermissions) {
        if (hasRole && hasPermission) return true;
      } else if (requiredRoles) {
        if (hasRole) return true;
      } else if (requiredPermissions) {
        if (hasPermission) return true;
      } else {
        return true;
      }
  
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }
  }
  