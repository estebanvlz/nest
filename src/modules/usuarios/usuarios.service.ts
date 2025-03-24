import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';
import { Rol } from 'src/common/entities/usuarios/rol.entity';
import { Permiso } from 'src/common/entities/usuarios/permisos.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
    @InjectRepository(Permiso)
    private readonly permisoRepo: Repository<Permiso>,
  ) {}

  // --- USUARIOS --- //

  async obtenerUsuario(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { id },
      relations: ['roles', 'roles.permisos', 'extraPermissions', 'blockedPermissions'],
    });
  }

  async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { email },
      relations: ['roles', 'roles.permisos', 'extraPermissions', 'blockedPermissions'],
    });
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async registrarUsuario(data: Partial<Usuario>) {
    const nuevo = this.usuarioRepo.create(data);
    return await this.usuarioRepo.save(nuevo);
  }


  // --- ROLES --- //

  async obtenerRol(rol: string): Promise<Rol | null> {
    return this.rolRepo.findOne({ where: { rol: rol } });
  }

  async obtenerRoles(roles: number[]): Promise<Rol[]> {
    return this.rolRepo.findBy({id: In(roles)});
  }

  // --- PERMISOS --- //

  async obtenerPermiso(permiso: string): Promise<Permiso | null> {
    return this.permisoRepo.findOne({ where: { permiso: permiso } });
  }

  async obtenerPermisos(permisos: number[]): Promise<Permiso[]>{
    return this.permisoRepo.findBy({id: In(permisos)});
  }


  // -- EXTRAS --

  async crearUsuario(nombre: string, email: string, password: string, roles: Rol[], permisosExtra: Permiso[], permisosBloqueados: Permiso[]){
    return await this.usuarioRepo.save(this.usuarioRepo.create({
      nombre,
      email,
      password,
      roles,
      permisosExtra,
      permisosBloqueados
    }))
  }

}
