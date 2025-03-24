import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('fisicas')
export class Fisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_1: string;

  @Column()
  nombre_2: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  sexo: string;

  @Column()
  profesion: string;

  @Column()
  actividad_economica: string;

  @Column()
  fecha_nac: Date;

  @Column()
  estado_civil: string;

  @Column()
  entidad_nac: number;

  @Column()
  curp: string;

  @Column()
  nacionalidad: string;

  @Column()
  grado_estudios: string;

  @OneToOne(() => Cliente)
  @JoinColumn()
  cliente: Cliente;
}
