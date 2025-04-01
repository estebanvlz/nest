import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { DataSource, Repository } from 'typeorm';
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
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { ClienteResponseDto } from './dto/cliente-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteConPersonaDto } from './dto/cliente-con.persona.dtp';

@Injectable()
export class ClientesService {
  constructor(
      private readonly usuarioService: UsuariosService,
      private readonly dataSource: DataSource,
      @InjectRepository(Cliente) private readonly clienteRepo: Repository<Cliente>,
  ) {}
    

  async obtenerClientesPorEmpresa(empresaId: number): Promise<ApiResponse<ClienteConPersonaDto[]>> {
    try {
      const clientes = await this.clienteRepo
        .createQueryBuilder('cliente')
        .leftJoin('cliente.empresas', 'empresa')
        .leftJoinAndSelect('cliente.personaFisica', 'personaFisica')
        .leftJoinAndSelect('cliente.personaMoral', 'personaMoral')
        .where('empresa.id = :empresaId', { empresaId })
        .andWhere('cliente.isActive = true')
        .select([
          'cliente.id',
          'cliente.rfc',
          'cliente.serieFiel',
          'cliente.tipoCliente',
          'cliente.usuario',
          'personaFisica.id',
          'personaFisica.nombre1',
          'personaFisica.apellidoPaterno',
          'personaFisica.curp',
          'personaMoral.id',
          'personaMoral.razonSocial',
          'personaMoral.fechaConstitucion',
        ])
        .getMany();
  
      const resultado: ClienteConPersonaDto[] = clientes.map(cliente => ({
        cliente,
        personaFisica: cliente.personaFisica || null,
        personaMoral: cliente.personaMoral || null,
      }));
  
      return new ApiResponse(true, 'Clientes obtenidos correctamente', resultado);

    } catch (error) {
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudieron obtener los clientes')
      );
    }
  }
    
  
  async registrarCliente(dto: RegistrarClienteDto, req: Request): Promise<ApiResponse<ClienteResponseDto>> {
    try {
      let clienteGuardado: Cliente;
  
      const usuarioId =  1; // Temporal para pruebas
  
      const responseDto: ClienteResponseDto = {
        rfc: dto.rfc,
        serieFiel: dto.serieFiel,
        tipoClienteId: dto.tipoClienteId,
      };
  
      await this.dataSource.transaction(async (manager) => {
        // Validar tipo de cliente
        const tipoCliente = await manager.findOneBy(TipoCliente, { id: dto.tipoClienteId });
        if (!tipoCliente) {
          throw new NotFoundException('No se encontró el tipo de cliente');
        }
  
        // Crear cliente
        const nuevoCliente = manager.create(Cliente, {
          rfc: dto.rfc,
          serieFiel: dto.serieFiel,
          tipoCliente: { id: dto.tipoClienteId } as TipoCliente,
          usuario: { id: usuarioId } as Usuario,
        });
  
        clienteGuardado = await manager.save(nuevoCliente);
  
        // Persona Física
        if (tipoCliente.id === 1) {
          const personaFisica = manager.create(PersonaFisica, {
            ...dto.personaFisica,
            estadoCivil: { id: dto.personaFisica?.estadoCivilId } as EstadoCivil,
            actividadEconomica: { id: dto.personaFisica?.actividadEconomicaId } as ActividadEconomicaFisica,
            entidadNacimiento: { id: dto.personaFisica?.entidadNacimientoId } as EntidadNacimiento,
            gradoEstudios: { id: dto.personaFisica?.gradoEstudiosId } as GradoEstudios,
            profesion: { id: dto.personaFisica?.profesionId } as Profesion,
            paisNacimiento: { id: dto.personaFisica?.paisNacimientoId } as Pais,
            nacionalidad: { id: dto.personaFisica?.nacionalidadId } as Pais,
            cliente: clienteGuardado,
            usuario: { id: usuarioId } as Usuario,
          });
  
          const personaGuardada = await manager.save(personaFisica);
          responseDto.personaFisicaId = personaGuardada.id;
  
        // Persona Moral
        } else if (tipoCliente.id === 2) {
          const personaMoral = manager.create(PersonaMoral, {
            ...dto.personaMoral,
            actividadEconomica: { id: dto.personaMoral?.actividadEconomicaId } as ActividadEconomicaMoral,
            paisConstitucion: { id: dto.personaMoral?.paisConstitucionId } as Pais,
            cliente: clienteGuardado,
            usuario: { id: usuarioId } as Usuario,
          });
  
          const moralGuardada = await manager.save(personaMoral);
          responseDto.personaMoralId = moralGuardada.id;
  
        } else if (tipoCliente.id === 3) {
          throw new HttpException('Tipo de cliente aún no implementado', 501);
        }
      });
  
      return new ApiResponse(true, 'Cliente registrado correctamente', responseDto);
  
    } catch (error) {
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudo registrar el cliente')
      );
    }
  }
  
  async registrarDomiciliosCliente(dto: any){

  }
}
