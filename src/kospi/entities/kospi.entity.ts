import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kospi')
export class Kospi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'reuters_code', nullable: false })
  reutersCode: string;
}
