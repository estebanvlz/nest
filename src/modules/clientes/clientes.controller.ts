import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { RolesPermissionsGuard } from 'src/common/guards/auth/roles-permisos.guard';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtPayload } from 'src/common/interfaces/payload.interface';

@Controller('client')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(RolesPermissionsGuard)
  @Roles('usuario')
  @Post()
  registrar(@Body() dto: RegistrarClienteDto, @Req() req: Request & {user: JwtPayload}){
    return this.clientesService.crearCliente(dto, req);
  }

  @Get()
  listado(){
    return this.clientesService.obtenerClientes();
  }
}