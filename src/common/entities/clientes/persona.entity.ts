import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.entity";
import { PersonaFisica } from "./persona-fisica.entity";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre1: string;

  @Column({ nullable: true })
  nombre2?: string;

  @Column({name: 'apellido_paterno'})
  apellidoPaterno: string;

  @Column({name: 'apellido_materno'})
  apellidoMaterno: string;

  @Column({name: 'fecha_nacimiento'})
  fechaNacimiento: Date;

  @Column({ nullable: true })
  curp: string;

  @Column({ type: 'smallint', nullable: true })
  genero: number;

  @OneToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToOne(() => PersonaFisica, pf => pf.persona)
  personaFisica: PersonaFisica;

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'creador_id'})
  usuario: Usuario;
}