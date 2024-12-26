import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trader')
export class Trader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ name: 'base_uri', nullable: false })
  baseUri: string;
}
