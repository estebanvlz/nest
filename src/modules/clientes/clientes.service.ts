import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { PersonaFisica } from 'src/common/entities/clientes/fisica.entity';
import { PersonaMoral } from 'src/common/entities/clientes/moral.entity';
import { Persona } from 'src/common/entities/clientes/persona.entity';
import { TipoCliente } from 'src/common/entities/clientes/tipo-cliente.entity';
import { Repository } from 'typeorm';
import { RegistrarClienteDto } from './dto/RegistrarCliente.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/payload.interface';

@Injectable()
export class ClientesService {
    constructor(
        private readonly usuarioService: UsuariosService,
        @InjectRepository(Cliente) private readonly clienteRepo: Repository<Cliente>,
        @InjectRepository(Persona) private readonly personaRepo: Repository<Persona>,
        @InjectRepository(PersonaFisica) private readonly fisicaRepo: Repository<PersonaFisica>,
        @InjectRepository(PersonaMoral) private readonly moralRepo: Repository<PersonaMoral>,
        @InjectRepository(TipoCliente) private readonly tipoClienteRepo: Repository<TipoCliente>,
    ) {}
      
    log(req: Request & {user :JwtPayload}){
        
        console.log(req.user.roles);
        
        return (req.user.roles)
    }

    async crearCliente(dto: RegistrarClienteDto, req: Request) {
        const tipoCliente = await this.tipoClienteRepo.findOneBy({ id: dto.tipoCliente });
      
        if (!req) {

        }
        req.user;

        if (!tipoCliente) {
          throw new BadRequestException('Tipo de cliente inválido');
        }
      
        const cliente = this.clienteRepo.create({
            rfc: dto.rfc,
            serieFiel: dto.serieFiel,
            pais: dto.pais,
            tipoCliente: tipoCliente,

        });
      
        const clienteGuardado = await this.clienteRepo.save(cliente);
      
        // if (dto.tipoPersona === 1 && dto.fisica) {
        //   const persona = this.personaRepo.create({
        //     nombre1: dto.fisica.primerNombre,
        //     nombre2: dto.fisica.segundoNombre,
        //     apellidoPaterno: dto.fisica.apellidoPaterno,
        //     apellidoMaterno: dto.fisica.apellidoMaterno,
        //     curp: dto.fisica.curp,
        //     fechaNacimiento: dto.fisica.fechaNacimiento,
        //     genero: parseInt(dto.fisica.genero),
        //     tipo: dto.tipoPersona,
        //   });
        //   const personaGuardada = await this.personaRepo.save(persona);
      
        //   const fisica = this.fisicaRepo.create({
        //     persona: personaGuardada,
        //     cliente: clienteGuardado,
        //     actividadEconomica: dto.fisica.actividadEconomica,
        //     profesion: dto.fisica.profesion,
        //     fechaNacimiento: dto.fisica.fechaNacimiento,
        //     entidadNacimiento: parseInt(dto.fisica.entidadNacimiento),
        //     estadoCivil: parseInt(dto.fisica.estadoCivil),
        //     nacionalidad: dto.fisica.nacionalidad,
        //     gradoEstudios: dto.fisica.gradoEstudio,
        //   });
      
        //   await this.fisicaRepo.save(fisica);
        // }
      
        // if (dto.tipoPersona === 2 && dto.moral) {
        //   const moral = this.moralRepo.create({
        //     cliente: clienteGuardado,
        //     razonSocial: dto.moral.razonSocial,
        //     fechaConstitucion: dto.moral.fechaConstitucion,
        //     actividadEconomica: dto.moral.actividadEconomica,
        //     paisConstitucion: dto.moral.paisConstitucion,
        //     paginaWeb: dto.moral.paginaWeb,
        //     serieFiel: dto.moral.serieFiel,
        //   });
      
        //   await this.moralRepo.save(moral);
        // }
      
        // return { mensaje: 'Cliente registrado exitosamente' };
      }
      

    // async crearCliente(dto: RegistrarClienteDto, req: Request) {
    //     const tipoCliente = await this.tipoClienteRepo.findOneBy({ id: dto.tipoCliente });
      
    //     if (!tipoCliente) {
    //         throw new BadRequestException('Tipo de cliente inválido');
    //     }
      
    //     const cliente = this.clienteRepo.create({
             
    //     });
      
    //     const clienteGuardado = await this.clienteRepo.save(cliente);
      
    //     if (dto.tipoPersona === 1 && dto.fisica) {
    //         const persona = this.personaRepo.create({

    //         });
    //         const personaGuardada = await this.personaRepo.save(persona);
      
    //         const fisica = this.fisicaRepo.create({

    //         });
      
    //         await this.fisicaRepo.save(fisica);
    //     }
      
    //     if (dto.tipoPersona === 2 && dto.moral) {
    //         const moral = this.moralRepo.create({

    //         });
      
    //         await this.moralRepo.save(moral);
    //     }
      
    //     return { mensaje: 'Cliente registrado exitosamente' };
    //   }
      
}
