import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class RefreshTokenDto{
    @ApiProperty({ example: 'esta muy larga esa madre pero ya sabes que va aqui'})
    @IsNotEmpty()
    refreshToken: string;
}