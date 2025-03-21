import { SetMetadata } from '@nestjs/common';

export const Permisos = (...permissions: string[]) => SetMetadata('permissions', permissions);
