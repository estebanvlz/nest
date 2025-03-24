import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecreto',
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuariosService.findById(payload.sub);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    
    const permisosRol = usuario.roles.flatMap((rol) => rol.permisos.map(p => p.permiso));
    const permisosExtra = usuario.extraPermissions.map(p => p.permiso);
    const permisosBloqueados = usuario.blockedPermissions.map(p => p.permiso);

    const permisosSet = new Set([...permisosRol, ...permisosExtra]);
    permisosBloqueados.forEach(p => permisosSet.delete(p));

    return {
      userId: usuario.id,
      username: usuario.usuario,
      roles: usuario.roles.map(r => r.rol),
      permisos: Array.from(permisosSet),
    };
  }
}
