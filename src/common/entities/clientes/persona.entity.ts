import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  rfc: string;

  @Column()
  curp: string;

  @Column()
  tipo: number;

  @Column()
  cliente_id: number;

  @Column({ type: 'tinyint', nullable: true })
  genero: number;
}
