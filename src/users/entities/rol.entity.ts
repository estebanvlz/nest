import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Permiso } from "./permiso.entity";
import { Usuario } from "./usuario.entity";

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rol: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios: Usuario[];

  @ManyToMany(() => Permiso, { eager: true })
  @JoinTable({ name: "permisos_rol" })
  permisos: Permiso[];
}
