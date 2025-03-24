import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contactos')
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint' })
  tipo: number;

  @Column()
  cve_pais: number;

  @Column()
  contacto: string;

  @Column()
  cliente_id: number;
}
