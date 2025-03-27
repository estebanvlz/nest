import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { Cliente } from "./cliente.entity";
import { Persona } from "./persona.entity";


@Entity('personas_fisicas')
export class PersonaFisica{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profesion: number;
  
    @Column({ name: 'fecha_nacimiento', type: 'date' })
    fechaNacimiento: Date;
  
    @Column({ name: 'estado_civil' })
    estadoCivil: number;
  
    @Column({ name: 'entidad_nacimiento' })
    entidadNacimiento: number;
  
    @Column()
    nacionalidad: string;
  
    @Column({ name: 'grado_estudios' })
    gradoEstudios: string;

    @CreateDateColumn({name: 'fecha_creacion'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'fecha_actualizacion'})
    updatedAt: Date;
    
    @DeleteDateColumn({name: 'fecha_eliminado'})
    deletedAt: Date;

    // RELACIONES

    @OneToOne(() => Cliente, (cliente) => cliente.personaFisica)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
  
    @OneToOne(() => Persona, (persona) => persona.personaFisica)
    @JoinColumn({ name: 'persona_id' })
    persona: Persona;

    // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
    @ManyToOne(() => Usuario, {nullable: false})
    @JoinColumn({name: 'creador_id'})
    creador: Usuario;
}