import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional, MinLength } from "class-validator";

export class RegistroAdminDto {
    @IsNotEmptyObject()

    @IsNotEmpty()
    @ApiProperty({example: 'John Doe'})
    nombre: string;
    

    @ApiProperty({example: 'test@example.com'})
    @IsEmail()
    email: string;
    
    @ApiProperty({example: 'contraseña'})
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({
        type: [Number],
        required: false,
        examples: [1, 2, 3] 
    })
    rolesIds?: number[];
  
    @IsOptional()
    @IsArray()
    permisosExtraIds?: number[];
  
    @IsOptional()
    @IsArray()
    permisosBloqueadosIds?: number[];
}