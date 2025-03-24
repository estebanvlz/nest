import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Permiso } from "./permisos.entity";

@Entity({name: 'roles'})
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    rol: string;

    @ManyToMany(() => Usuario, (usuario) => usuario.roles,)
    usuarios: Usuario[];

    @ManyToMany(() => Permiso, (permission) => permission.roles, { eager: true })
    @JoinTable({name: 'roles_permisos'})
    permisos: Permiso[];
}