import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async registrarUsuario(email: string, password: string){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

        const usuarioExistente = await queryRunner.manager.findOne(UsuarioEntity, {
            where: {email},
            select: ['id'],
        });

        if (usuarioExistente) {
            throw new UnauthorizedException('El usuario ya existe');
        }

        const hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = queryRunner.manager.create(UsuarioEntity, {email, password: hash})
        
        await queryRunner.manager.save(UsuarioEntity, nuevoUsuario);

        await queryRunner.commitTransaction();

        return { mensaje: 'Usuario registrado exitosamente', data: nuevoUsuario };

    } catch(error) {        

        await queryRunner.rollbackTransaction();

        throw new UnauthorizedException('Error al registrar usuario');

    } finally {

        await queryRunner.release();

    }

  }

  async iniciarSesion(email: string, password: string){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

        const usuario = await queryRunner.manager.findOne(UsuarioEntity, {
            where: {email},
            relations: ['roles', 'roles.permisos', 'permisosAdicionales', 'permisosBloqueados'],      
        })

        if (!usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const esValida = await bcrypt.compare(password, usuario.password);

        if(!esValida) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const roles = usuario.roles.map(rol => rol.rol);
        const permisos = [
            ...new Set([
                ...usuario.roles.flatMap(rol => rol.permisos.map(permiso => permiso.permiso)),
                ...usuario.permisosAdicionales.map(permiso => permiso.permiso),
            ]),
        ];
        const permisosBloqueados = usuario.permisosBloqueados.map(permiso => permiso.permiso);

        const permisosFinales = permisos.filter(p => !permisosBloqueados.includes(p));

        const payload = {
            sub: usuario.id,
            correo: usuario.email,
            roles,
            permisos: permisosFinales,
        };

        const token = this.jwtService.sign(payload);    

        await queryRunner.commitTransaction();

        return { access_token: token };

    } catch(error) {

        await queryRunner.rollbackTransaction();
        throw new UnauthorizedException('Error en la autenticación');
        
    } finally {
        
        await queryRunner.release();

    }
  }


}
