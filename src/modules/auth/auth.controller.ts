import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Public } from 'src/common/decorators/public.decorators';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService
  ) {}

  @Post('login')
  async login(@Body() body: { usuario: string; password: string }) {
    const user = await this.authService.validateUser(body.usuario, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const payload = this.authService.verifyRefreshToken(body.refreshToken);
    const user = await this.usuariosService.findById(payload.sub);
    return this.authService.login(user);
  }

}
