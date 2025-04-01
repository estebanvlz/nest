import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonaMoralDto {
  @ApiProperty()
  @IsString()
  razonSocial: string;

  @ApiProperty()
  @IsDateString()
  fechaConstitucion: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paginaWeb?: string;

  @ApiProperty()
  @IsNumber()
  paisConstitucionId: number;

  @ApiProperty()
  @IsNumber()
  actividadEconomicaId: number;
}