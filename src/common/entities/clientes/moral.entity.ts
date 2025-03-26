import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { Cliente } from "./cliente.entity";


@Entity('personas_morales')
export class PersonaMoral{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'razon_social', type: 'varchar'})
    razonSocial: string;

    @Column({name: 'fecha_constitucion', type: 'date' })
    fechaConstitucion: Date;

    @Column({name: 'actividad_economica', type: 'int'})
    actividadEconomica: number;

    @CreateDateColumn({name: 'fecha_creacion'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'fecha_actualizacion'})
    updatedAt: Date;
    
    @DeleteDateColumn({name: 'fecha_eliminado'})
    deletedAt: Date;

    // RELACIONES

    @OneToOne(() => Cliente, (cliente) => cliente.personaMoral)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
    @ManyToOne(() => Usuario, {nullable: false})
    @JoinColumn({name: 'creador_id'})
    creador: Usuario;
}