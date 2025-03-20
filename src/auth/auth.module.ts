import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: 
  [
    TypeOrmModule.forFeature(
    [UsuarioEntity]), 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({      
      secret: 'secreto_super_seguro',
      signOptions: { expiresIn: '1h' },
    })

  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
