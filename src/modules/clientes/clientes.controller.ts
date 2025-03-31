import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/auth/jwt-auth.guard';

@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
  ) {}

  @Post()
  registrar(@Body() dto: RegistrarClienteDto, req: Request){
    return this.clientesService.registrarCliente(dto, req);
  }

}