import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/common/entities/clientes/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  crear(dto: CreateClienteDto) {
    const cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(cliente);
  }

  obtenerTodos() {
    return this.clienteRepo.find();
  }

  obtenerUno(id: number) {
    return this.clienteRepo.findOneBy({ id });
  }

  async actualizar(id: number, dto: UpdateClienteDto) {
    await this.clienteRepo.update(id, dto);
    return this.obtenerUno(id);
  }

}
