//import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  //@IsEmail({}, { message: 'El email debe ser válido' })
  //@IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  //@IsString({ message: 'La contraseña debe ser un texto' })
  //@IsNotEmpty({ message: 'La contraseña es obligatoria' })
  contraseña: string;
}
