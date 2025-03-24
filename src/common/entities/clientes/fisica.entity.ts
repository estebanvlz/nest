import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';


@Entity('fisicas')
export class Fisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profesion: number;

  @Column()
  actividad_economica: string;

  @Column()
  fecha_nac: Date;

  @Column()
  estado_civil: string;

  @Column()
  entidad_nac: number;

  @Column()
  nacionalidad: string;

  @Column()
  grado_estudios: string;

  @OneToOne(() => Cliente, cliente => cliente.fisica)
  @JoinColumn()
  cliente: Cliente;
}
