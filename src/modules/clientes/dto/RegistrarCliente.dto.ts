import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { FisicaDto } from './PersonaFisica.dto';
import { MoralDto } from './PersonaMoral.dto';

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

  @IsString()
  rfc: string;

  @IsString()
  pais: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FisicaDto)
  fisica?: FisicaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MoralDto)
  moral?: MoralDto;

  @IsDefined()
  @IsNumber()
  tipoCliente: number;
}
