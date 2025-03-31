import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_actividades_economicas_morales')
export class ActividadEconomicaMoral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}