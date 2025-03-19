import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso.entity';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async findByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({ 
      where: { email }, 
      relations: ['roles', 'permisosExtra', 'permisosBloqueados'] 
    });

    if (!user) {
      throw new NotFoundException(`Usuario con username "${email}" no encontrado`);
    }

    return user;
  }

  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId }, 
      relations: ['roles', 'permisosExtra', 'permisosBloqueados'] 
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const rolePermissions = user.roles.flatMap(role => role.permisos.map(permiso => permiso.permiso));
    const extraPermissions = user.permisosExtra.map(permiso => permiso.permiso);
    const blockedPermissions = new Set(user.permisosBloqueados.map(permiso => permiso.permiso));

    return [...new Set([...rolePermissions, ...extraPermissions])].filter(perm => !blockedPermissions.has(perm));
  }
}