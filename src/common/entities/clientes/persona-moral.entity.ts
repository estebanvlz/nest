import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('personas_morales')
export class PersonaMoral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'razon_social'})
  razonSocial: string;

  @Column({ type: 'date', name:'fecha_constitucion' })
  fechaConstitucion: Date;

  @Column({name: 'pais_constitucion'})
  paisConstitucion: string;

  @Column({ nullable: true, name: 'pagina_web'})
  paginaWeb?: string;

  @OneToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Usuario, {nullable: false})
  @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}
