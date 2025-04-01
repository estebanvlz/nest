import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegistroPublicoDto {

  @IsNotEmpty()
  @ApiProperty({example: 'John Doe'})
  nombre: string;

  @ApiProperty({example: 'test@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'contraseña'})
  @MinLength(6)
  password: string;
}
