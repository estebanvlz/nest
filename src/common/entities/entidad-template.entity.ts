import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('')
export class NombreEntidad{
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    // RELACIONES

    // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
    // @ManyToOne(() => Usuario, {nullable: false})
    // @JoinColumn({name: 'creador_id'})
    // creador: Usuario;
}