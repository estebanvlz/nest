import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { PersonaFisica } from 'src/common/entities/clientes/persona-fisica.entity';
import { PersonaMoral } from 'src/common/entities/clientes/persona-moral.entity';

export class ClienteConPersonaDto {
  @ApiProperty({ type: Cliente })
  cliente: Cliente;

  @ApiProperty({ type: PersonaMoral, nullable: true })
  personaMoral: PersonaMoral | null;

  @ApiProperty({ type: PersonaFisica, nullable: true })
  personaFisica: PersonaFisica | null;
}
