import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Stock } from './stock.entity';

@Entity('trade_history')
export class TradeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: ['매수', '매도'], name: 'trade_type' })
  tradeType: '매수' | '매도';

  @ManyToOne(() => User, (user) => user.tradeHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Stock, (stock) => stock.tradeHistories)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @CreateDateColumn({ name: 'concluded_at' })
  concludedAt: Date;
}
