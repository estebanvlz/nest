import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { TipoCliente } from "./catalogos/tipo-cliente.entity";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rfc: string;

  @Column({ name: 'serie_fiel' })
  serieFiel: string;

  @Column({name: 'actividades_economicas'})
  actividadEconomica: string;

  @ManyToOne(() => TipoCliente)
  @JoinColumn({ name: 'tipo_cliente_id' })
  tipoCliente: TipoCliente;

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}
