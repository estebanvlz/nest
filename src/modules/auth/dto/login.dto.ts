import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'usuario@mail.com' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'contraseña'})
    @IsNotEmpty()
    password: string;
}