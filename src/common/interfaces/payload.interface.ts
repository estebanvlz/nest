export interface JwtPayload {
    userId: number;
    email: string;
    roles: string[];
    permisos: string[];
  }
  