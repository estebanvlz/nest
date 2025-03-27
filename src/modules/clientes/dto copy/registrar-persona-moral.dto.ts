import { IsString, IsDateString, IsNumber } from 'class-validator';

export class MoralDto {
  @IsString()
  razonSocial: string;

  @IsDateString()
  fechaConstitucion: string;

  @IsString()
  paisConstitucion: string;

  @IsString()
  paginaWeb: string;

  @IsString()
  serieFiel: string;
}
