import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nasdaq')
export class Nasdaq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'reuters_code', nullable: false })
  reutersCode: string;
}
