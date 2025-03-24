import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos_personas')
export class TipoPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
}
