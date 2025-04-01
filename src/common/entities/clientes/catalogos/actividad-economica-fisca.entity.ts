import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ctl_actividades_economicas_fisicas')
export class ActividadEconomicaFisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}