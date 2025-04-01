import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuarios/usuario.entity";


@Entity('')
export class NombreEntidad{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'boolean', name: 'activo', default: true})
    isActive: boolean;
    
    @Column({type: 'date', name: 'fecha_creacion', nullable: true})
    createdAt: Date;
    
    @Column({type: 'date', name: 'fecha_actualizacion', nullable: true})
    updatedAt: Date;
    
    @Column({type: 'date', name: 'fecha_eliminacion', nullable: true})
    deletedAt: Date;


    // RELACIONES

    // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
    // @ManyToOne(() => Usuario, {nullable: false})
    // @JoinColumn({name: 'usuario_id'})
    // usuario: Usuario;
}