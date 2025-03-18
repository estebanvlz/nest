import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        
        if (!token) {
            throw new UnauthorizedException();
        }
      
        try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        );
        req['email'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        

        return true;
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}