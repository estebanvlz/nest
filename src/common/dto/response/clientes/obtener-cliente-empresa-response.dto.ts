import { ApiProperty } from "@nestjs/swagger";
import { ClienteConPersonaDto } from "src/modules/clientes/dto/cliente-con.persona.dtp";


export class ObtenerClienteEmpresaResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Clientes obtenidos correctamente' })
  message: string;

  @ApiProperty({ type: [ClienteConPersonaDto] })
  data: ClienteConPersonaDto[];
}
