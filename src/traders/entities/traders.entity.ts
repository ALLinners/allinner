import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
create table traders (
    name text primary key ,
    base_uri text not null
);
 */

@Entity('traders')
export class Traders {
  @PrimaryGeneratedColumn()
  name: string;

  @Column({ name: 'base_uri', nullable: false })
  baseUri: string;
}
