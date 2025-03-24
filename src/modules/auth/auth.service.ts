import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    // async validateUser(email: string, password: string): Promise<any> {
    //     const user = await this.usuariosService.findOne(email);
        
    //     if (user && (await bcrypt.compare(password, user.password))) {
    //         const { password, ...result } = user;
    //         return result; 
    //     }
        
    //     throw new UnauthorizedException('Credenciales inválidas');
    // }

    // async login(user: any) {
    //     const payload = { username: user.username, sub: user.id };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}
