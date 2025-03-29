import { Controller } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('client')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
  ) {}




}