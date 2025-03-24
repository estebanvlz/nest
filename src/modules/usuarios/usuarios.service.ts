import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findByUsername(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { usuario },
      relations: ['roles', 'roles.permisos', 'extraPermissions', 'blockedPermissions'],
    });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { id },
      relations: ['roles', 'roles.permisos', 'extraPermissions', 'blockedPermissions'],
    });
  }
}
