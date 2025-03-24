import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Persona } from './persona.entity';

@Entity('tipos_personas')
export class TipoPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

}
