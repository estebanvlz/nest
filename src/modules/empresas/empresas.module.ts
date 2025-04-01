import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Empresa } from "src/common/entities/empresas/empresa.entity";
import { EmpresasService } from "./empresas.service";
import { EmpresasController } from "./empresas.controller";
import { UsuariosModule } from "../usuarios/usuarios.module";


@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), UsuariosModule],
  controllers: [EmpresasController],
  providers: [EmpresasService],
  exports: [EmpresasService]
})
export class EmpresasModule {}