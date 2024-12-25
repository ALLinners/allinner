import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
create table trader (
    id serial primary key,
    name text not null unique,
    base_uri text not null
);
 */

@Entity('trader')
export class Trader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ name: 'base_uri', nullable: false })
  baseUri: string;
}
