import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/common/entities/usuario.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosService {
  // constructor(
  //     private readonly dataSource: DataSource,
  // ){}

  // async findOne(email: string) {
  //     const usuario = await this.dataSource
  //         .createQueryBuilder(Usuario, 'usuario')
  //         .where('usuario.email = :email', { email })
  //         .getOne();
  
  //     this.dataSource.createQueryRunner()
  //     return usuario;
  // }
    

  // async getEffectivePermissions(userId: number): Promise<string[]> {
  //   const queryRunner = this.dataSource.createQueryRunner(); 
  //   await queryRunner.connect();

  //   try {
  //     const rolePermissions = await queryRunner.manager.query(
  //       `SELECT DISTINCT p.name 
  //        FROM user_roles ur
  //        JOIN role_permissions rp ON ur.roleId = rp.roleId
  //        JOIN permission p ON rp.permissionId = p.id
  //        WHERE ur.userId = $1`, 
  //       [userId]
  //     );

  //     const extraPermissions = await queryRunner.manager.query(
  //       `SELECT DISTINCT p.name 
  //        FROM user_extra_permissions uep
  //        JOIN permission p ON uep.permissionId = p.id
  //        WHERE uep.userId = $1`, 
  //       [userId]
  //     );

  //     const blockedPermissions = await queryRunner.manager.query(
  //       `SELECT DISTINCT p.name 
  //        FROM user_blocked_permissions ubp
  //        JOIN permission p ON ubp.permissionId = p.id
  //        WHERE ubp.userId = $1`, 
  //       [userId]
  //     );

  //     await queryRunner.release(); 

  //     let finalPermissions = [...new Set([...rolePermissions.map(r => r.name), ...extraPermissions.map(e => e.name)])];

  //     const blockedSet = new Set(blockedPermissions.map(b => b.name));
  //     finalPermissions = finalPermissions.filter(perm => !blockedSet.has(perm));

  //     return finalPermissions;
  //   } catch (error) {
  //     await queryRunner.release(); 
  //     throw new Error(`Error obteniendo permisos del usuario: ${error.message}`);
  //   }
  // }

  // async obtenerPermisosUsuario(id: number){}
}
