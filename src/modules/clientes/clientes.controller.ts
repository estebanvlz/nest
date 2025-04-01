import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { Request } from 'express';
import { ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { RegistrarClienteResponseDto } from '../../common/dto/response/clientes/registrar-cliente-response.dto';
import { ObtenerClienteEmpresaResponseDto } from 'src/common/dto/response/clientes/obtener-cliente-empresa-response.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
  ) {}


  @Get(':id')
  @ApiOperation({ summary: 'Obtener clientes activos de una empresa' })
  @ApiOkResponse({ description: 'Lista de clientes', type: ObtenerClienteEmpresaResponseDto })
  @ApiNotFoundResponse({ description: 'Empresa no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error al consultar clientes' })
  async getClientesPorEmpresa(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.obtenerClientesPorEmpresa(id);
  }


  @Post()
  @ApiOperation({ summary: 'Registrar nuevo cliente' })
  @ApiCreatedResponse({
    description: 'Cliente registrado correctamente',
    type: RegistrarClienteResponseDto, 
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiConflictResponse({ description: 'RFC ya existente' })
  registrar(@Body() dto: RegistrarClienteDto, @Req() req: Request) {
    return this.clientesService.registrarCliente(dto, req);
  }
  
}