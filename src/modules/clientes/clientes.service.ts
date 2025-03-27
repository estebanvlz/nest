import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
import { Usuario } from 'src/common/entities/usuarios/usuario.entity';

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
      
    
    // async obtenerClientes(){
    //     const clientes = await this.clienteRepo
    //     .createQueryBuilder('cliente')
    //     .leftJoin('cliente.tipoCliente', 'tipoCliente')
    //     .leftJoin('cliente.personaMoral', 'personaMoral')
    //     .leftJoin('cliente.personaFisica', 'personaFisica')
    //     .leftJoin('cliente.creador', 'creador')
    //     .select([
    //       'cliente.id',
    //       'cliente.rfc',
    //       'cliente.serieFiel',
    //       'cliente.actividadEconomica',
    //       'cliente.createdAt',
    //       'cliente.updatedAt',
    //       'tipoCliente.id',
    //       'personaMoral.id',
    //       'personaMoral.razonSocial',
    //       'personaFisica.id',
    //       'creador.id',
    //     ])
    //     .getMany();

    //     return clientes;
    // }

    async crearCliente(dto: RegistrarClienteDto, req: Request & {user: JwtPayload}) {
        try {

            const userId = req.user.userId;
            const usuario = await this.usuarioService.obtenerUsuario(userId);
            let personaMoral;
            let personaMoralGuardada;
            let personaFisica;
    
            if(!usuario){
                throw new NotFoundException('No se encontro el usuario');
            }
            
            const tipoCliente = await this.tipoClienteRepo.findOneBy({ id: dto.tipoCliente });

            if (!tipoCliente) {
                throw new NotFoundException('No se encontro el tipo de cliente.');
            }

            if(tipoCliente.id == 1){

            } else if(tipoCliente.id == 2){

            } else if(tipoCliente.id == 3){

                personaMoral = this.moralRepo.create({
                    serieFiel: dto.serieFiel,
                    razonSocial: dto.moral?.razonSocial,
                    paisConstitucion: dto.moral?.paisConstitucion,
                    fechaConstitucion: dto.moral?.fechaConstitucion,
                    paginaWeb: dto.moral?.paginaWeb,
                    creador: usuario,
                })

                personaMoralGuardada = await this.moralRepo.save(personaMoral);

            } else {
                throw new BadRequestException('El tipo de cliente no es valido.')
            }

            const cliente = this.clienteRepo.create({
                actividadEconomica: dto.actividadEconomica,
                rfc: dto.rfc,
                serieFiel: dto.serieFiel,
                tipoCliente: tipoCliente,
                personaMoral: personaMoralGuardada,
                personaFisica: personaFisica,
                creador: {id: usuario.id} as Usuario
            });

            const clienteGuardado = await this.clienteRepo.save(cliente);

            return clienteGuardado


        } catch (error) {
            
            throw new InternalServerErrorException('Ocurrio un error al registrar el cliente')

        }
      
      }
      

}
