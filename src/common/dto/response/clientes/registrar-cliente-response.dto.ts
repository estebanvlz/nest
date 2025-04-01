import { ApiProperty } from '@nestjs/swagger';
import { ClienteResponseDto } from '../../../../modules/clientes/dto/cliente-response.dto'; 

export class RegistrarClienteResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Cliente registrado correctamente' })
  message: string;

  @ApiProperty({ type: ClienteResponseDto })
  data: ClienteResponseDto;
}
