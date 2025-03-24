import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('contactos')
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  tipo: number;

  @Column()
  cve_pais: number;

  @Column()
  contacto: string;

  @ManyToOne(() => Cliente, cliente => cliente.contactos)
  cliente: Cliente;
}
