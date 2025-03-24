import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Persona } from './persona.entity';
import { Domicilio } from './domicilio.entity';
import { Contacto } from './contacto.entity';
import { Fisica } from './fisica.entity';
import { Moral } from './moral.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rfc: string;

  @Column()
  serie_fiel: string;

  @Column()
  pais: string;

  @OneToOne(() => Moral, moral => moral.cliente)
  moral: Moral;

  @OneToOne(() => Fisica, fisica => fisica.cliente)
  fisica: Fisica;

  @OneToMany(() => Persona, persona => persona.cliente, { cascade: true })
  personas: Persona[];

  @OneToMany(() => Domicilio, domicilio => domicilio.cliente, { cascade: true })
  domicilios: Domicilio[];

  @OneToMany(() => Contacto, contacto => contacto.cliente, { cascade: true })
  contactos: Contacto[];
}