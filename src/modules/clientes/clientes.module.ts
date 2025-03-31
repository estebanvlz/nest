import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { PersonaFisica } from 'src/common/entities/clientes/persona-fisica.entity';
import { PersonaMoral } from 'src/common/entities/clientes/persona-moral.entity';
import { TipoCliente } from 'src/common/entities/clientes/catalogos/tipo-cliente.entity';
import { ActividadEconomicaFisica } from 'src/common/entities/clientes/catalogos/actividad-economica-fisca.entity';
import { ActividadEconomicaMoral } from 'src/common/entities/clientes/catalogos/actividad-economica-moral.entity';
import { EntidadNacimiento } from 'src/common/entities/clientes/catalogos/entidad-nacimiento.entity';
import { EstadoCivil } from 'src/common/entities/clientes/catalogos/estado-civil.entity';
import { GradoEstudios } from 'src/common/entities/clientes/catalogos/grado-estudio.entity';
import { Pais } from 'src/common/entities/clientes/catalogos/paises-ctl.entity';
import { Profesion } from 'src/common/entities/clientes/catalogos/profesion.entity';

const typeormModule = TypeOrmModule.forFeature([
  Cliente, 
  PersonaFisica, 
  PersonaMoral, 
  TipoCliente,
  ActividadEconomicaFisica, 
  ActividadEconomicaMoral, 
  EntidadNacimiento, 
  EstadoCivil, 
  GradoEstudios, 
  Pais, 
  Profesion, 
  TipoCliente
]);

@Module({
  imports: [typeormModule, UsuariosModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
