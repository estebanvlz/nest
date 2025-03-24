import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column({ type: 'tinyint' })
  aplica_pf: number;

  @Column({ type: 'tinyint' })
  aplica_pfa: number;

  @Column({ type: 'tinyint' })
  aplica_pm: number;

  @Column({ type: 'tinyint' })
  requiere_fecha_c: number;
}
