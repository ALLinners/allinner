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

  @ManyToOne(() => User, (user) => user.tradeHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Stock, (stock) => stock.tradeHistories)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @CreateDateColumn({ name: 'concluded_at' })
  concludedAt: Date;
}
