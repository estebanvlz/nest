import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { RolesPermissionsGuard } from 'src/common/guards/auth/roles-permisos.guard';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(RolesPermissionsGuard)
  @Roles('usuario')
  @Post()
  registrar(@Body() dto: RegistrarClienteDto, @Req() req: Request){
    
  }

  @Get('a')
  log(@Req() req: Request & {user: any}){
    return this.clientesService.log(req);
  }
}
