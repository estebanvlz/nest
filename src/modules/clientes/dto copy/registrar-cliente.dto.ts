import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { FisicaDto } from './PersonaFisica.dto';
import { MoralDto } from './registrar-persona-moral.dto';

export class RegistrarClienteDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  tipoPersona: number;

  @IsDefined()
  @IsString()
  serieFiel: string;

  @IsDefined()
  @IsNumber()
  tipoCliente: number;

  @IsNumber()
  actividadEconomica: number;

  @IsString()
  rfc: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FisicaDto)
  fisica?: FisicaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MoralDto)
  moral?: MoralDto;


}
