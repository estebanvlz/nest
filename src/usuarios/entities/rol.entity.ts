import { EntitySchema } from 'typeorm';
import { Rol } from '../interfaces/rol.interface';

export const RolEntity = new EntitySchema<Rol>({
  name: 'Rol',
  tableName: 'roles',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    rol: {
      type: 'varchar',
      unique: true,
    },
  },
  relations: {
    permisos: {
      target: 'Permiso',
      type: 'many-to-many',
      joinTable: { name: 'roles_permisos' },
      eager: false,
    },
  },
});
