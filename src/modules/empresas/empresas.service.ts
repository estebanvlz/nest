import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsuariosService } from "../usuarios/usuarios.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "src/common/entities/empresas/empresa.entity";
import { RegistrarEmpresaDto } from "./dto/registrar-empresa.dto";
import { Usuario } from "src/common/entities/usuarios/usuario.entity";
import { ApiResponse } from "src/common/dto/api-response.dto";
import { identity } from "rxjs";



@Injectable()
export class EmpresasService {
  constructor(
      private readonly usuarioService: UsuariosService,
      private readonly dataSource: DataSource,
      @InjectRepository(Empresa) private readonly empresasRepo: Repository<Empresa>,
  ) {}


  async obtenerEmpresaPorId(empresaId: number): Promise<ApiResponse<Empresa>> {
    try {
      
      const empresa = await this.empresasRepo.findOne({
        where: {
          isActive: true,
          id: empresaId
        }
      })

      if(!empresa) {
        throw new NotFoundException('No se puedo encontrar la empresa con id: ' + empresaId)
      }

      return new ApiResponse(true, '', empresa);

    } catch (error) {
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudo encontrar la empresa.')
      );  
    }
  }

  async obtenerEmpresas(): Promise<ApiResponse<Empresa[]>> {
    try {

      const empresas = await this.empresasRepo.find({
        where: {isActive: true}
      });

      if(!empresas){
        throw new NotFoundException('No se encontraron empresas')
      }

      return new ApiResponse(true, 'Se encontraron todas las empresas con exitos.', empresas)

    } catch(error) {
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudieron encontrar las empresas.')
      );    
    }
  }

  async registrarEmpresa(dto: RegistrarEmpresaDto): Promise<ApiResponse<Empresa>> {
    try {
      const existe = await this.empresasRepo.findOneBy({ rfc: dto.rfc });
  
      if (existe) {
        throw new ConflictException('Ya existe una empresa con ese RFC');
      }
  
      const nuevaEmpresa = this.empresasRepo.create({
        rfc: dto.rfc,
        razonSocial: dto.razonSocial,
        createdAt: new Date(),
        usuario: { id: 1 } as Usuario,
      });
  
      const guardada = await this.empresasRepo.save(nuevaEmpresa);
  
      return new ApiResponse(true, 'Empresa registrada correctamente', guardada);
  
    } catch (error) {
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudo registrar la empresa')
      );
    }
  }
  
  async eliminarEmpresa(empresaId: number): Promise<ApiResponse<Empresa>> {
    try {
      const empresa = await this.empresasRepo.findOne({ 
        where: {
          id: empresaId,
          isActive: true
        }
       });
  
      if (!empresa) {
        throw new NotFoundException('No se encontro la empresa con id: '+ empresaId);
      }

      empresa.isActive = false;
      empresa.deletedAt = new Date();

      const empresaEliminada = await this.empresasRepo.save(empresa);

  
    return new ApiResponse(true, 'Empresa eliminada correctamente', empresaEliminada);

    } catch (error) {
    
      throw new InternalServerErrorException(
        new ApiResponse(false, 'No se pudo eliminar la empresa')
      );
    }  
  }
}