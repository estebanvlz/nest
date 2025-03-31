import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { DataSource } from 'typeorm';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { TipoCliente } from 'src/common/entities/clientes/catalogos/tipo-cliente.entity';
import { PersonaFisica } from 'src/common/entities/clientes/persona-fisica.entity';
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';
import { Request } from 'express';
import { EstadoCivil } from 'src/common/entities/clientes/catalogos/estado-civil.entity';
import { ActividadEconomicaFisica } from 'src/common/entities/clientes/catalogos/actividad-economica-fisca.entity';
import { EntidadNacimiento } from 'src/common/entities/clientes/catalogos/entidad-nacimiento.entity';
import { GradoEstudios } from 'src/common/entities/clientes/catalogos/grado-estudio.entity';
import { Profesion } from 'src/common/entities/clientes/catalogos/profesion.entity';
import { Pais } from 'src/common/entities/clientes/catalogos/paises-ctl.entity';
import { PersonaMoral } from 'src/common/entities/clientes/persona-moral.entity';
import { ActividadEconomicaMoral } from 'src/common/entities/clientes/catalogos/actividad-economica-moral.entity';

@Injectable()
export class ClientesService {
  constructor(
      private readonly usuarioService: UsuariosService,
      private readonly dataSource: DataSource,
  ) {}
    
  
  
  async registrarCliente(dto: RegistrarClienteDto, req: Request): Promise<any> {
    
    try {
      // INICIO TRANSACCION
      await this.dataSource.transaction(async (manager) => {

        const usuario = req.user;

        // Validar el tipo de cliente.
        const tipoCliente = await manager.findOneBy(TipoCliente, {
          id: dto.tipoClienteId,
        });

        // Si el tipo de cliente no se encuentra.
        if(!tipoCliente){
          throw new NotFoundException('No se encontro el tipo de cliente')
        }

        // Se crea la entidad del cliente.
        const nuevoCliente = manager.create(Cliente, {
          rfc: dto.rfc,
          serieFiel: dto.serieFiel,
          tipoCliente: {id: dto.tipoClienteId} as TipoCliente,
          usuario: {id: 1} as Usuario
        })

        // Guardar en la base de datos.
        await manager.save(nuevoCliente);

        if (tipoCliente.id === 1){

          //Crear la entidad de la persona fisica
          const nuevaPersonaFisica = manager.create(PersonaFisica, {
            apellidoPaterno: dto.personaFisica?.apellidoPaterno,
            apellidoMaterno: dto.personaFisica?.apellidoMaterno,
            nombre1: dto.personaFisica?.nombre1,
            nombre2: dto.personaFisica?.nombre2,
            genero: dto.personaFisica?.genero,
            curp: dto.personaFisica?.curp,
            fechaNacimiento: dto.personaFisica?.fechaNacimiento,
            estadoCivil: {id: dto.personaFisica?.estadoCivilId} as EstadoCivil,
            actividadEconomica: {id: dto.personaFisica?.actividadEconomicaId} as ActividadEconomicaFisica,
            entidadNacimiento: {id: dto.personaFisica?.entidadNacimientoId} as EntidadNacimiento,
            gradoEstudios: {id: dto.personaFisica?.gradoEstudiosId} as GradoEstudios,
            profesion: {id: dto.personaFisica?.profesionId} as Profesion,
            paisNacimiento: {id: dto.personaFisica?.paisNacimientoId} as Pais,
            nacionalidad: {id: dto.personaFisica?.nacionalidadId} as Pais,
            usuario: {id: 1} as Usuario,
            cliente: {id: nuevoCliente.id} as Cliente
          });

          // Registrar la persona fisica en BD
          await manager.save(nuevaPersonaFisica);

          // Si todo sale bien enviar el id del cliente
          return {mensaje: 'Se registro el cliente correctamente', clienteId: nuevoCliente.id};

        } else if (tipoCliente.id === 2){

          //Crear la entidad de la persona moral
          const nuevaPersonaMoral = manager.create(PersonaMoral, {
            razonSocial: dto.personaMoral?.razonSocial,
            fechaConstitucion: dto.personaMoral?.fechaConstitucion,
            paginaWeb: dto.personaMoral?.paginaWeb,
            paisConstitucion: {id: dto.personaMoral?.paisConstitucionId} as Pais,
            actividadEconomica: {id: dto.personaMoral?.actividadEconomicaId} as ActividadEconomicaMoral,
            usuario: {id: 1} as Usuario,
          })

          // Registrar la persona fisica en BD
          await manager.save(nuevaPersonaMoral);

          // Si todo sale bien enviar el id del cliente
          return {mensaje: 'Se registro el cliente correctamente', clienteId: nuevoCliente.id};
          
        } else if(tipoCliente.id === 3){
          throw new HttpException('Todavia no queda we', 500)
        }

      }) 



    } catch (error) {
      
    }
  }

  async registrarDomiciliosCliente(dto: any){

  }
}
