import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('domicilios')
export class Domicilio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;

  @Column()
  no_exterior: string;

  @Column({ nullable: true })
  no_interior: string;

  @Column()
  codigo_postal: string;

  @Column()
  pais: number;

  @Column()
  estado: number;

  @Column()
  municipio: number;

  @Column()
  ciudad: number;

  @Column()
  asentamiento: number;

  @ManyToOne(() => Cliente, cliente => cliente.domicilios)
  cliente: Cliente;
}
