import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PersonaMoralDto } from './RegistrarPersonaMoral.dto';
import { PersonaFisicaDto } from './RegistrarPersonaFisica.dto';

export class RegistrarClienteDto {
  @ApiProperty()
  @IsString()
  rfc: string;

  @ApiProperty()
  @IsString()
  serieFiel: string;

  @ApiProperty({ description: '1 = Física, 2 = Moral' })
  @IsNumber()
  tipoClienteId: number;
  
  @ApiPropertyOptional({ type: PersonaFisicaDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonaFisicaDto)
  personaFisica?: PersonaFisicaDto;

  @ApiPropertyOptional({ type: PersonaMoralDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonaMoralDto)
  personaMoral?: PersonaMoralDto;
}