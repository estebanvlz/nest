import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { DataSource } from 'typeorm';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';

@Injectable()
export class ClientesService {
    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly dataSource: DataSource,

    ) {}
      
    
      
    async registrarCliente(dto: any): Promise<any> {

        // INICIO TRANSACCION
        await this.dataSource.transaction(async (manager) => {
          const cliente = manager.create(Cliente, {
            rfc: dto.rfc,
            tipoCliente: dto.tipoCliente,
            pais: dto.pais
          })
        }) 
    
        
      }
}
