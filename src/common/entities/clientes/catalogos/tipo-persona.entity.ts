import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tipos_persona')
export class TipoPersona{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}