import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/isPublic.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('registro')
  async registrar(@Body() datos: { email: string; password: string }): Promise<any> {
    console.log(datos);
    return this.authService.registrarUsuario(datos.email, datos.password);
  }

  @Post('login')
  async iniciarSesion(@Body() datos: { email: string, password: string }) {
    return this.authService.iniciarSesion(datos.email, datos.password);
  }

}
