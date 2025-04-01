import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PersonaFisica } from 'src/common/entities/clientes/persona-fisica.entity';
import { PersonaMoral } from 'src/common/entities/clientes/persona-moral.entity';

export class ClienteResponseDto {
  @ApiProperty()
  @IsString()
  rfc: string;

  @ApiProperty()
  @IsString()
  serieFiel: string;

  @ApiProperty({ description: '1 = Física, 2 = Moral' })
  @IsNumber()
  tipoClienteId: number;
  
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => PersonaFisica)
  personaFisicaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  personaMoralId?: number;
}