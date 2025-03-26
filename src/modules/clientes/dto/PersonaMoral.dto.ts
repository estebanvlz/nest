import { IsString, IsDateString } from 'class-validator';

export class MoralDto {
  @IsString()
  razonSocial: string;

  @IsDateString()
  fechaConstitucion: string;

  @IsString()
  paisConstitucion: string;

  @IsString()
  actividadEconomica: string;

  @IsString()
  paginaWeb: string;

  @IsString()
  serieFiel: string;
}
