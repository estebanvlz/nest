import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.crear(dto);
  }

  @Get()
  findAll() {
    return this.clientesService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.obtenerUno(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.clientesService.actualizar(+id, dto);
  }

}
