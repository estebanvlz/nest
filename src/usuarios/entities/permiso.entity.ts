import { EntitySchema } from 'typeorm';
import { Permiso } from '../interfaces/permiso.interface';

export const PermisoEntity = new EntitySchema<Permiso>({
  name: 'Permiso',
  tableName: 'permisos',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    permiso: {
      type: 'varchar',
      unique: true,
    },
  },
});
