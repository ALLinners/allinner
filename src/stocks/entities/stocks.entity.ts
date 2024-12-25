import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
create table stocks (
    id serial primary key,
    reuters_code text not null,
    name text not null,
    traders_name text references traders(name)
);
 */

@Entity('stocks')
export class Stocks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reuters_code', nullable: false })
  reutersCode: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'traders_name' })
  tradersName: string;
}
