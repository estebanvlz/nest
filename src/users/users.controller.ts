import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//  @Get(':id')
//  async obtenerUsuario(@Param('id') id: number) : Promise<Usuario>{
//    return await this.usersService.obtenerUsuarioPorEmail(id);
//  }

  @Post('crear')
  async crearUsuario(@Body() usuario: Usuario) {
    return await this.usersService.registrarUsuario(usuario);
  }
}