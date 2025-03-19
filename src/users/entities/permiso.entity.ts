import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";

@Entity('permisos')
export class Permiso{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    permiso: string;
}