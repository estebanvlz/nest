import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Rol } from 'src/common/entities/usuarios/rol.entity';
import { Permiso } from 'src/common/entities/usuarios/permisos.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usuariosService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.usuario };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        roles: user.roles.map((r: Rol) => r.rol),
        permisos: this.getUserPermissions(user),
      }
    };
  }

  getUserPermissions(user: any): string[] {
    const permisosRol = user.roles.flatMap((rol: Rol) => rol.permisos.map((p) => p.permiso));
    const permisosExtra = user.extraPermissions.map((p: Permiso) => p.permiso);
    const permisosBloqueados = user.blockedPermissions.map((p: Permiso) => p.permiso);

    const permisosFinal = new Set([...permisosRol, ...permisosExtra]);
    permisosBloqueados.forEach((p: Permiso) => permisosFinal.delete(p));

    return Array.from(permisosFinal);
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refreshsecreto',
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
  
}
