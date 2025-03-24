import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('morales')
export class Moral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razon_social: string;

  @Column()
  fecha_constitucion: Date;

  @Column()
  actividad_economica: number;

  @Column()
  cliente_id: number;
}
