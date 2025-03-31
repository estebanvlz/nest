import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Pais } from "./catalogos/paises-ctl.entity";
import { ActividadEconomicaMoral } from "./catalogos/actividad-economica-moral.entity";

@Entity('personas_morales')
export class PersonaMoral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'razon_social' })
  razonSocial: string;

  @Column({ name: 'fecha_constitucion', type: 'date' })
  fechaConstitucion: Date;

  @Column({ name: 'pagina_web', nullable: true })
  paginaWeb?: string;

  @ManyToOne(() => Pais)
  @JoinColumn({ name: 'pais_constitucion_id' })
  paisConstitucion: Pais;

  @ManyToOne(() => ActividadEconomicaMoral)
  @JoinColumn({ name: 'actividad_economica_id' })
  actividadEconomica: ActividadEconomicaMoral;

  @OneToOne(() => Cliente, (cliente) => cliente.personaMoral)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
