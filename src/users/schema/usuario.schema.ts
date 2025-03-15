import { EntitySchema } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

export const UsuariosSchema = new EntitySchema<Usuario>({
  tableName: 'usuarios',
  name: 'Usuario',
  columns: {
    id: {
      type: "integer",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    contraseña: {
      type: "varchar",
    },
    isActive: {
      type: "bool",
      default: true,
    },
  },
});