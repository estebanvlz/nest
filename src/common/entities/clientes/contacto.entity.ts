import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";


@Entity('morales')
export class Moral{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'razon_social', nullable: false, })
    razonSocial: string;

    @Column({name: 'fecha_contitucion', type: 'timestamp with time zone', nullable: false})
    fechaContitucion: Date;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    // Relaciones

    @ManyToOne(() => Usuario, {nullable: false})
    @JoinColumn({name: 'creador_id'})
    creador: Usuario;
}