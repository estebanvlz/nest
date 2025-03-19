import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { Permiso } from './permiso.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Rol, (rol) => rol.usuarios, { eager: true })
  @JoinTable({name: "roles_usuarios"})
  roles: Rol[];

  @ManyToMany(() => Permiso, { eager: true }) 
  @JoinTable({name: "permisos_extra_usuarios"})
  permisosExtra: Permiso[];  

  @ManyToMany(() => Permiso, { eager: true }) 
  @JoinTable({name: "permisos_bloqueados_usuarios"})
  permisosBloqueados: Permiso[];  

  @Column({ default: true })
  isActive: boolean;
}
