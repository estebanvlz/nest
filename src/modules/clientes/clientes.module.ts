import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { Persona } from 'src/common/entities/clientes/persona.entity';
import { PersonaFisica } from 'src/common/entities/clientes/fisica.entity';
import { PersonaMoral } from 'src/common/entities/clientes/moral.entity';
import { TipoCliente } from 'src/common/entities/clientes/tipo-cliente.entity';

const typeormModule = TypeOrmModule.forFeature([Cliente, Persona, PersonaFisica, PersonaMoral, TipoCliente]);

@Module({
  imports: [typeormModule, UsuariosModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
