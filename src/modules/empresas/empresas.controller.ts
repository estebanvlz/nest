import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { EmpresasService } from "./empresas.service";
import { RegistrarEmpresaDto } from "./dto/registrar-empresa.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { EmpresaResponseDto } from "../../common/dto/response/empresas/empresa-response.dto";


@Controller('empresas')
export class EmpresasController {
  constructor(
    private readonly empresasService: EmpresasService,
  ) {}


  @Post()
  @ApiOperation({ summary: 'Registrar una nueva empresa' })
  @ApiCreatedResponse({
    description: 'Empresa creada correctamente',
    type: EmpresaResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiConflictResponse({ description: 'RFC ya existente' })
  async registrarEmpresa(@Body() dto: RegistrarEmpresaDto) {
    return this.empresasService.registrarEmpresa(dto);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener empresa por ID' })
  @ApiOkResponse({ description: 'Empresa encontrada', type: EmpresaResponseDto })
  @ApiNotFoundResponse({ description: 'Empresa no encontrada' })
  async obtenerEmpresa(@Param('id') id: number) {
    return this.empresasService.obtenerEmpresaPorId(id);
    
  }

  @Get()
  @ApiOperation({ summary: 'Obtener empresas' })
  @ApiOkResponse({ description: 'Empresas encontradas', type: EmpresaResponseDto })
  @ApiNotFoundResponse({ description: 'Empresas no encontradas' })
  async obtenerEmpresas() {
    return this.empresasService.obtenerEmpresas();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar empresa (soft delete)' })
  @ApiOkResponse({
    description: 'Empresa eliminada correctamente',
    type: EmpresaResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Empresa no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error al eliminar empresa' })
  async eliminarEmpresa(@Param('id', ParseIntPipe) id: number) {
    return this.empresasService.eliminarEmpresa(id);
  }
}