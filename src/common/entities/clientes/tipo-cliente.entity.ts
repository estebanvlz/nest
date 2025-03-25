import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cliente } from "./cliente.entity";

@Entity('tipo_cliente')
export class TipoCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Cliente, (cliente) => cliente.tipoCliente)
  clientes: Cliente[];
}
