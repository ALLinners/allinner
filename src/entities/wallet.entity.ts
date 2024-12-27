import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @Column({ nullable: false, name: 'account_number' })
  accountNumber: string;

  @Column({ nullable: false })
  balance: number;
}
