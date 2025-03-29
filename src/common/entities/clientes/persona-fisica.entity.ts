import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Persona } from "./persona.entity";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('personas_fisicas')
export class PersonaFisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profesion: number;

  @Column({name: 'actividad_economica'})
  actividadEconomica: string;

  @Column({name: 'estado_civil'})
  estadoCivil: number;

  @Column({ name: 'pais_nacimiento' })
  pais_nacimiento: string;

  @Column({name: 'entidad_nacimiento'})
  entidadNacimiento: string;

  @Column()
  nacionalidad: string;

  @Column({name: 'grado_estudios'})
  gradoEstudios: string;

  @OneToOne(() => Persona, persona => persona.personaFisica)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}
