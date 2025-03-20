import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Like } from 'typeorm';
import { PermisoEntity } from './entities/permiso.entity';
import { RolEntity } from './entities/rol.entity';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

    constructor(
      	@InjectDataSource()
      	private readonly dataSource: DataSource,
    ) {}

	async obtenerUsuarios() {
		const usuarios = await this.dataSource
			.getRepository(UsuarioEntity)
			.createQueryBuilder('usuario')
			.select(["usuario.id", "usuario.email"])
			.where("usuario.isActive = :bool", { bool: true })
			.getMany();
	
		return usuarios;
	}


    async obtenerPermisosPorModulo(modulo: string){
      	const queryRunner = this.dataSource.createQueryRunner();
      	await queryRunner.connect();
      	await queryRunner.startTransaction();

		const string = modulo.split('_', 2);

		try {

			const permisos = await queryRunner.manager.findBy(PermisoEntity, {
				permiso: Like(`%_${string[1]}`)
			})

			if(permisos.length == 0){
				return {message: 'No hay permisos para este modulo.'}
			}

			return {message: 'Permisos obtenidos exitosamente.', data: permisos}

		} catch(error) {

			console.log(error);

		} finally {

			await queryRunner.release();

		}
    }

    async obtenerRolesPorModulo(modulo: string){
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

	  	const string = modulo.split('_', 2);

	  	try{

		  	const roles = await queryRunner.manager.findBy(RolEntity, {
			  	rol: Like(`${string[0]}_%`)
		  	})

			if(roles.length == 0){
				throw new NotFoundException('No se encontraron roles para este modulo')
			}

			return {message: 'Permisos obtenidos exitosamente.', data: roles}
	  	} catch(error){

		  	console.log(error);
	  	} finally{

		  	await queryRunner.release();
	  	}
	}

	async obtenerPermisosUsuario(usuarioId: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
	
		try {	
			const usuario = await queryRunner.manager.findOne(UsuarioEntity, {
				where: { id: usuarioId },
				relations: ['roles', 'roles.permisos', 'permisosAdicionales', 'permisosBloqueados']
			});
	
			if (!usuario) {
				throw new NotFoundException(`No se encontró el usuario con ID: ${usuarioId}`);
			}

			console.log(usuario);
			
		
			const rolesUsuario = usuario.roles || [];
			let permisosUsuario = rolesUsuario.flatMap((rol) => rol.permisos || []);
		
			permisosUsuario = permisosUsuario.concat(usuario.permisosAdicionales || []);
	
			permisosUsuario = permisosUsuario.filter(
				(permiso) => !usuario.permisosBloqueados.some((bloqueado) => bloqueado.id === permiso.id)
			);
		
			return { message: 'Permisos obtenidos correctamente', data: permisosUsuario };
			
		} catch (error) {
			throw new NotFoundException(`Error al obtener permisos del usuario`);
	
		} finally {
			await queryRunner.release();
		}
	}
	
    async asignarRolUsuario(usuarioId: number, permisoId: number){}


}
