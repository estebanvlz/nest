import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}


  async registrarUsuario(usuario: Usuario) {
    const existingUser = await this.usuarioRepository.findOne({ where: { email: usuario.email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso.');
    }

    const salt = await bcrypt.genSalt();
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);

    return await this.usuarioRepository.save(usuario);
  }

  async obtenerUsuarioPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ email });

    if (!usuario) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }

    return usuario;
  }

}