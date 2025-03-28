import { IsString, IsDateString, IsOptional } from 'class-validator';

export class FisicaDto {
  @IsString()
  apellidoPaterno: string;

  @IsString()
  apellidoMaterno: string;

  @IsString()
  primerNombre: string;

  @IsOptional()
  @IsString()
  segundoNombre?: string;

  @IsString()
  genero: string;

  @IsString()
  profesion: string;

  @IsString()
  actividadEconomica: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsString()
  paisNacimiento: string;

  @IsString()
  estadoCivil: string;

  @IsString()
  entidadNacimiento: string;

  @IsString()
  curp: string;

  @IsString()
  serieIne: string;

  @IsString()
  nacionalidad: string;

  @IsString()
  gradoEstudio: string;
}
