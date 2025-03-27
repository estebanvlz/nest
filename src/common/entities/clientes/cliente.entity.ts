import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { TipoCliente } from "./tipo-cliente.entity";
import { PersonaFisica } from "./fisica.entity";
import { PersonaMoral } from "./moral.entity";
import { Persona } from "./persona.entity";


@Entity('clientes')
export class Cliente{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'rfc', type: 'varchar', nullable: false})
    rfc: string;

    @Column({name: 'serie_fiel', type: 'varchar', nullable: false})
    serieFiel: string;

    @Column({name: 'actividad_economica', type: 'int'})
    actividadEconomica: number;

    @CreateDateColumn({name: 'fecha_creacion'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'fecha_actualizacion'})
    updatedAt: Date;
    
    @DeleteDateColumn({name: 'fecha_eliminado'})
    deletedAt: Date;

    // Relaciones

    @ManyToOne(() => TipoCliente, (tipo) => tipo.clientes, { nullable: false, eager: true })
    @JoinColumn({ name: 'tipo_cliente_id' })
    tipoCliente: TipoCliente;

    @OneToOne(() => PersonaMoral, (moral) => moral.cliente)
    @JoinColumn({ name: 'persona_moral_id' })
    personaMoral?: PersonaMoral;
  
    @OneToOne(() => PersonaFisica, (fisica) => fisica.cliente)
    @JoinColumn({name: 'persona_fisica_id'})
    personaFisica?: PersonaFisica;

    @OneToMany(() => Persona, (persona) => persona.cliente)
    personas: Persona[];    

    @ManyToOne(() => Usuario, {nullable: false, eager: false})
    @JoinColumn({name: 'creador_id'})
    creador: Usuario;
}


