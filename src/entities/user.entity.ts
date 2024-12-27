import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Wallet } from './wallet.entity';
import { TradeHistory } from './trade-history.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets?: Wallet[];

  @OneToMany(() => TradeHistory, (tradeHistory) => tradeHistory.stock)
  @JoinColumn({ name: 'trade_history_id' })
  tradeHistories?: TradeHistory[];
}
