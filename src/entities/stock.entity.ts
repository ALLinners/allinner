import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trader } from './trader.entity';
import { TradeHistory } from './trade-history.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reuters_code', nullable: false })
  reutersCode: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Trader, (trader) => trader.stocks)
  @JoinColumn({ name: 'trader_id' })
  trader: Trader;

  @OneToMany(() => TradeHistory, (tradeHistory) => tradeHistory.stock)
  @JoinColumn({ name: 'trade_history_id' })
  tradeHistories?: TradeHistory[];
}
