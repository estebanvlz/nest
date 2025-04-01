import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { TipoCliente } from "./catalogos/tipo-cliente.entity";
import { PersonaFisica } from "./persona-fisica.entity";
import { PersonaMoral } from "./persona-moral.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Empresa } from "../empresas/empresa.entity";

@Entity('clientes')
export class Cliente {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rfc: string;

  @Column({ name: 'serie_fiel' })
  serieFiel: string;

  @Column({type: 'boolean', name: 'activo'})
  isActive: boolean;

  @Column({type: 'date', name: 'fecha_creacion'})
  createdAt: Date;
  
  @Column({type: 'date', name: 'fecha_actualizacion'})
  updatedAt: Date;
  
  @Column({type: 'date', name: 'fecha_eliminacion'})
  deletedAt: Date;

  // RELACIONES

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;

  @ManyToOne(() => TipoCliente, (tipo) => tipo.clientes, { eager: true })
  @JoinColumn({ name: 'tipo_cliente_id' })
  tipoCliente: TipoCliente;

  @OneToOne(() => PersonaMoral, (moral) => moral.cliente)
  personaMoral: PersonaMoral;

  @OneToOne(() => PersonaFisica, (fisica) => fisica.cliente)
  personaFisica: PersonaFisica;

  @ManyToMany(() => Empresa, empresa => empresa.clientes)
  @JoinTable({
    name: 'empresas_clientes',
    joinColumn: {name: 'cliente_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'empresa_id', referencedColumnName: 'id'}
  })
  empresas: Empresa[];
}
