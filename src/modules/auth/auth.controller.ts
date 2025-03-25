import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorators';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegistroAdminDto } from './dto/registro-admin.dto';
import { JwtAuthGuard } from 'src/common/guards/auth/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/common/guards/auth/roles-permisos.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // @Post('registro')
  // async register(@Body() dto: RegistroPublicoDto) {
  //   return this.authService.registroPublico(dto);
  // }

  @UseGuards(RolesPermissionsGuard)
  @Roles('admin_usuarios')
  @Post('registro')
  async register(@Body() dto: RegistroAdminDto) {
    return this.authService.registroAdmin(dto);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refrescarToken(dto);
  }
}
