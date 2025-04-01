import { ApiProperty } from '@nestjs/swagger';
import { Empresa } from 'src/common/entities/empresas/empresa.entity';

export class EmpresaResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Empresa })
  data: Empresa;
}
