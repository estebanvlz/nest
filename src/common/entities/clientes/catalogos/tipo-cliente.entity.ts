import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('tipo_cliente')
export class TipoCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
