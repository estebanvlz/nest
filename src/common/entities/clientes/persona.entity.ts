import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Cliente } from './cliente.entity';


@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_1: string;

  @Column({ nullable: true })
  nombre_2: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  fecha_nac: Date;

  @Column({ nullable: true })
  rfc: string;

  @Column()
  curp: string;

  @Column()
  tipo: number;

  @Column({ type: 'smallint', nullable: true })
  genero: number;

  @ManyToOne(() => Cliente, cliente => cliente.personas)
  cliente: Cliente;
}
