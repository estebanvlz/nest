import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { Cliente } from "../clientes/cliente.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('empresas')
export class Empresa{
    
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({type: 'varchar', name: 'razon_social'})
  razonSocial: string;
  
  @ApiProperty()
  @Column({type: 'varchar', name: 'rfc', unique: true})
  rfc: string;

  @ApiProperty()
  @Column({type: 'boolean', name: 'activo', default: true})
  isActive: boolean;

  @ApiProperty()
  @Column({type: 'date', name: 'fecha_creacion', nullable: true})
  createdAt: Date;
  
  @ApiProperty()
  @Column({type: 'date', name: 'fecha_actualizacion', nullable: true})
  updatedAt: Date;
  
  @ApiProperty()
  @Column({type: 'date', name: 'fecha_eliminacion', nullable: true})
  deletedAt: Date;

  // RELACIONES

  @ManyToMany(() => Cliente, cliente => cliente.empresas)
  clientes: Cliente[]; 

  // DESCOMENTAR SI ES NECESARIO INCLUIR AL CREADOR DE DICHO OBJETO.
  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;

}