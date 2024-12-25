import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trader } from '../../trader/entities/trader.entity';

/*
create table stock (
    id serial primary key,
    reuters_code text not null,
    name text not null,
    traders_name text references trader(name)
);
 */

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reuters_code', nullable: false })
  reutersCode: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Trader, (trader) => trader.id)
  @JoinColumn({ name: 'trader_id' })
  trader: Trader;
}
