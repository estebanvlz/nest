import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class PersonaFisicaDto {
  @ApiProperty()
  @IsString()
  apellidoPaterno: string;

  @ApiProperty()
  @IsString()
  apellidoMaterno: string;

  @ApiProperty()
  @IsString()
  nombre1: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre2?: string;

  @ApiProperty()
  @IsNumber()
  genero: number;

  @ApiProperty()
  @IsString()
  curp: string;

  @ApiProperty()
  @IsDateString()
  fechaNacimiento: string;

  @ApiProperty()
  @IsNumber()
  estadoCivilId: number;

  @ApiProperty()
  @IsNumber()
  actividadEconomicaId: number;

  @ApiProperty()
  @IsNumber()
  entidadNacimientoId: number;

  @ApiProperty()
  @IsNumber()
  gradoEstudiosId: number;

  @ApiProperty()
  @IsNumber()
  profesionId: number;

  @ApiProperty()
  @IsNumber()
  paisNacimientoId: number;

  @ApiProperty()
  @IsNumber()
  nacionalidadId: number;
}
  