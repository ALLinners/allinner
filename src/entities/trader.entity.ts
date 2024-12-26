import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('trader')
export class Trader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ name: 'base_uri', nullable: false })
  baseUri: string;

  @OneToMany(() => Stock, (stock) => stock.trader)
  stocks: Stock[];
}
