import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';
import { Cliente } from './cliente.entity';

@Entity('morales')
export class Moral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razon_social: string;

  @Column()
  fecha_constitucion: Date;

  @Column()
  actividad_economica: number;

  @OneToOne(() => Cliente, cliente => cliente.moral)
  @JoinColumn()
  cliente: Cliente;
}