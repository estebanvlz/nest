import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class RegistrarEmpresaDto {

  @ApiProperty({
    description: 'Razón social de la empresa',
    example: 'Empresa S.A. de C.V.',
  })
  @IsString()
  razonSocial: string;

  @ApiProperty({
    description: 'RFC de la empresa (único)',
    example: 'AGS990101ABC',
  })
  @IsString()
  rfc: string;

}