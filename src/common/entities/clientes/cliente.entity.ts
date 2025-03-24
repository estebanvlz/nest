import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Persona } from './persona.entity';
import { Domicilio } from './domicilio.entity';
import { Contacto } from './contacto.entity';

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

  @OneToMany(() => Persona, persona => persona.cliente)
  personas: Persona[];

  @OneToMany(() => Domicilio, domicilio => domicilio.cliente)
  domicilios: Domicilio[];

  @OneToMany(() => Contacto, contacto => contacto.cliente)
  contactos: Contacto[];
}
