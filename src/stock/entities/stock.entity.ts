import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trader } from '../../trader/entities/trader.entity';

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
