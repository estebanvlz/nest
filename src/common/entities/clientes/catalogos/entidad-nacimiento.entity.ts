import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_entidades_nacimiento')
export class EntidadNacimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}