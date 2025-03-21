import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Permiso } from "./permisos.entity";

@Entity({name: 'usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({unique: true})
    usuario: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @ManyToMany(() => Rol, (rol) => rol.usuarios, {eager: true})
    @JoinTable({name: 'usuarios_roles'})
    roles: Rol[];

    @ManyToMany(() => Permiso, { eager: true })
    @JoinTable({ name: 'usuarios_permisos_extra' }) 
    extraPermissions: Permiso[];
  
    @ManyToMany(() => Permiso, { eager: true })
    @JoinTable({ name: 'usuarios_permisos_bloqueados' }) 
    blockedPermissions: Permiso[];

    // @Column({})
    // createdAt: Date;

    // @Column()
    // deletedAt: Date;



}