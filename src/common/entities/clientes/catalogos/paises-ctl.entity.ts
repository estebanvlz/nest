import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_paises')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pais: string;

  @Column()
  nacionalidad: string;
}
