import { Permiso } from "./permiso.interface";
import { Rol } from "./rol.interface";

export interface Usuario { 
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  roles: Rol[];
  permisosAdicionales: Permiso[];
  permisosBloqueados: Permiso[];
}