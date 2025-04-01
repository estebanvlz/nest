import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_estados_civiles')
export class EstadoCivil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}