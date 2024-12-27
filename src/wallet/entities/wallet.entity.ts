import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false, name: 'user_id', unique: true })
  userId: string;

  @Column({ nullable: false, name: 'account_number', unique: true })
  accountNumber: string;

  @Column({ nullable: false })
  balance: number;
}
