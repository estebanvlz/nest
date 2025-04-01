import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_profesiones')
export class Profesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
