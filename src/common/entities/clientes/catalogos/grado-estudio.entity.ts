import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_grados_estudios')
export class GradoEstudios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
