import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async registrar(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(cliente);
  }

  obtenerTodos(): Promise<Cliente[]> {
    return this.clienteRepo.find({
      relations: ['personas', 'domicilios', 'contactos'],
    });
  }

  obtenerPorId(id: number): Promise<any> {
    return this.clienteRepo.findOne({
      where: { id },
      relations: ['personas', 'domicilios', 'contactos'],
    });
  }
}