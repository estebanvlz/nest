import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { Persona } from 'src/common/entities/clientes/persona.entity';
import { Domicilio } from 'src/common/entities/clientes/domicilio.entity';
import { Contacto } from 'src/common/entities/clientes/contacto.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Persona, Domicilio, Contacto])],  
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
