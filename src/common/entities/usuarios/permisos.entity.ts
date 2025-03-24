import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";

@Entity({name: 'permisos'})
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    permiso: string;

    @ManyToMany(() => Rol, (rol) => rol.permisos, {eager: false})
    roles: Rol[];
}