import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { TipoCliente } from "./catalogos/tipo-cliente.entity";
import { PersonaFisica } from "./persona-fisica.entity";
import { PersonaMoral } from "./persona-moral.entity";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rfc: string;

  @Column({ name: 'serie_fiel' })
  serieFiel: string;

  @ManyToOne(() => TipoCliente, (tipo) => tipo.clientes, { eager: true })
  @JoinColumn({ name: 'tipo_cliente_id' })
  tipoCliente: TipoCliente;

  @OneToOne(() => PersonaMoral, (moral) => moral.cliente)
  personaMoral: PersonaMoral;

  @OneToOne(() => PersonaFisica, (fisica) => fisica.cliente)
  personaFisica: PersonaFisica;

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}
