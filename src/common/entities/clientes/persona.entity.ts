import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { PersonaFisica } from "./fisica.entity";
import { Cliente } from "./cliente.entity";


@Entity('personas')
export class Persona{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_1' })
    nombre1: string;
  
    @Column({ name: 'nombre_2', nullable: true })
    nombre2?: string;
  
    @Column({ name: 'apellido_patern' })
    apellidoPaterno: string;
  
    @Column({ name: 'apellido_matern' })
    apellidoMaterno: string;
  
    @Column({ name: 'fecha_nacimiento', type: 'date' })
    fechaNacimiento: Date;
  
    @Column({ nullable: true })
    rfc?: string;
  
    @Column()
    curp: string;
  
    @Column({name: 'tipo_persona'})
    tipoPersona: number;
  
    @Column({ name: 'genero', type: 'smallint', nullable: true })
    genero?: number;  

    @CreateDateColumn({name: 'fecha_creacion'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'fecha_actualizacion'})
    updatedAt: Date;
    
    @DeleteDateColumn({name: 'fecha_eliminado'})
    deletedAt: Date;

    // RELACIONES

    @OneToOne(() => PersonaFisica, (fisica) => fisica.persona)
    fisica: PersonaFisica;

    @ManyToOne(() => Cliente, (cliente) => cliente.personas)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente;

    // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
    @ManyToOne(() => Usuario, {nullable: false})
    @JoinColumn({name: 'creador_id'})
    creador: Usuario;
}