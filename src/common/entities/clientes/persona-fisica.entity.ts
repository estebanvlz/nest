import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { ActividadEconomicaFisica } from "./catalogos/actividad-economica-fisca.entity";
import { EntidadNacimiento } from "./catalogos/entidad-nacimiento.entity";
import { EstadoCivil } from "./catalogos/estado-civil.entity";
import { GradoEstudios } from "./catalogos/grado-estudio.entity";
import { Pais } from "./catalogos/paises-ctl.entity";
import { Profesion } from "./catalogos/profesion.entity";
import { Cliente } from "./cliente.entity";

@Entity('personas_fisicas')
export class PersonaFisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apellidoPaterno: string;

  @Column()
  apellidoMaterno: string;

  @Column()
  nombre1: string;

  @Column({ nullable: true })
  nombre2?: string;

  @Column({ type: 'smallint' })
  genero: number;

  @Column()
  curp: string;

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fechaNacimiento: Date;

  @ManyToOne(() => EstadoCivil)
  @JoinColumn({ name: 'estado_civil' })
  estadoCivil: EstadoCivil;

  @ManyToOne(() => ActividadEconomicaFisica)
  @JoinColumn({ name: 'actividad_economica_id' })
  actividadEconomica: ActividadEconomicaFisica;

  @ManyToOne(() => EntidadNacimiento)
  @JoinColumn({ name: 'entidad_nacimiento_id' })
  entidadNacimiento: EntidadNacimiento;

  @ManyToOne(() => GradoEstudios)
  @JoinColumn({ name: 'grado_estudio_id' })
  gradoEstudios: GradoEstudios;

  @ManyToOne(() => Profesion)
  @JoinColumn({ name: 'profesion_id' })
  profesion: Profesion;

  @ManyToOne(() => Pais)
  @JoinColumn({ name: 'pais_nacimiento_id' })
  paisNacimiento: Pais;

  @ManyToOne(() => Pais)
  @JoinColumn({ name: 'nacionalidad_id' })
  nacionalidad: Pais;

  @OneToOne(() => Cliente, (cliente) => cliente.personaFisica)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
