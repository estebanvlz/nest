import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
