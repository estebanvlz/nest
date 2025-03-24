import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('domicilios')
export class Domicilio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;

  @Column()
  no_exterior: string;

  @Column({ nullable: true })
  no_interior: string;

  @Column()
  codigo_postal: string;

  @Column()
  pais: number;

  @Column()
  estado: number;

  @Column()
  municipio: number;

  @Column()
  ciudad: number;

  @Column()
  asentamiento: number;

  @Column()
  cliente_id: number;
}
