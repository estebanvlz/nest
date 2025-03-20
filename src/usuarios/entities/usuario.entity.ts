import { EntitySchema } from 'typeorm';
import { Usuario } from '../interfaces/usuario.interface';

export const UsuarioEntity = new EntitySchema<Usuario>({
  name: 'Usuario',
  tableName: 'usuarios',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    isActive: {
      type: 'boolean',
      default: true
    }
  },
  relations: {
    roles: {
      target: 'Rol',
      type: 'many-to-many',
      joinTable: {name : 'usuarios_roles'},
      eager: false,
    },
    permisosAdicionales: {
      target: 'Permiso',
      type: 'many-to-many',
      joinTable: { name: 'usuarios_permisos_adicionales' },      
      eager: false,
    },
    permisosBloqueados: {
      target: 'Permiso',
      type: 'many-to-many',
      joinTable: { name: 'usuarios_permisos_bloqueados' },      
      eager: false,
    },
  },
});
