import { Permiso } from "./permiso.interface";

export interface Rol { 
    id: number;
    rol: string;
    permisos: Permiso[];
  }