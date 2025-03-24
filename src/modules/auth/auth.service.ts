import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Rol } from 'src/common/entities/usuarios/rol.entity';
import { Permiso } from 'src/common/entities/usuarios/permisos.entity';
import { RegistroPublicoDto } from './dto/registro-publico.dto';
import { RegistroAdminDto } from './dto/registro-admin.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.validarUsuario(dto.email, dto.password);

    const payload = { sub: usuario.id, email: usuario.email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        roles: usuario.roles.map((r: Rol) => r.rol),
        permisos: this.permisosUsuario(usuario),
      }
    };
  }

  async refrescarToken(dto: RefreshTokenDto){
    const payload = this.verificarRefreshToken(dto.refreshToken);

    const usuario = await this.usuariosService.obtenerUsuario(payload.id);

    if (!usuario){
      throw new BadRequestException('Error al refrescar el token')
    }

    return this.login(usuario);
  }

  async registroPublico(dto: RegistroPublicoDto){
    const usuarioExiste = await this.usuariosService.obtenerUsuarioPorEmail(dto.email);

    if(usuarioExiste){
      throw new BadRequestException('Usuario o correo ya están en uso');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const rolPorDefecto = await this.usuariosService.obtenerRol('usuario');

    if (!rolPorDefecto) {
      throw new NotFoundException('Rol por defecto no existe')
    }
  
    const usuario = await this.usuariosService.registrarUsuario({
      nombre: dto.nombre,
      // usuario: dto.usuario,
      email: dto.email,
      password: passwordHash,
      roles: [rolPorDefecto],
    });

    return { mensaje: 'Usuario registrado correctamente', data: usuario };
  }

  async registroAdmin(dto: RegistroAdminDto){
    const usuarioExiste = await this.usuariosService.obtenerUsuarioPorEmail(dto.email);

    if(usuarioExiste){
      throw new BadRequestException('Usuario o correo ya están en uso');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const roles = dto.rolesIds?.length
      ? await this.usuariosService.obtenerRoles(dto.rolesIds)
      : [];
  
    const permisosExtra = dto.permisosExtraIds?.length
      ? await this.usuariosService.obtenerPermisos(dto.permisosExtraIds)
      : [];
  
    const permisosBloqueados = dto.permisosBloqueadosIds?.length
      ? await this.usuariosService.obtenerPermisos(dto.permisosBloqueadosIds)
      : [];

    const nuevoUsuarios = this.usuariosService.crearUsuario(
      dto.nombre,
      dto.email,
      passwordHash,
      roles,
      permisosExtra,
      permisosBloqueados,
    );

  return {message: 'Usuario registrado con exito.', data: nuevoUsuarios};
  }


  async validarUsuario(email: string, password: string) {
    const user = await this.usuariosService.obtenerUsuarioPorEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  
  permisosUsuario(user: Usuario): string[] {
    const permisosRol: string[] = user.roles.flatMap((rol: Rol) =>
      rol.permisos.map(p => p.permiso)
    );
  
    const permisosExtra: string[] = user.permisosExtra.map(p => p.permiso);
    const permisosBloqueados: string[] = user.permisosBloqueados.map(p => p.permiso);
  
    const permisosFinal = new Set<string>([...permisosRol, ...permisosExtra]);
  
    for (const permiso of permisosBloqueados) {
      permisosFinal.delete(permiso);
    }
  
    return Array.from(permisosFinal);
  }
  

  verificarRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
  
}
