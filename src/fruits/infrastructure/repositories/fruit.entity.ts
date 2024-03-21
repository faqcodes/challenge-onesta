import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Fruit {
  @PrimaryColumn()
  fruit!: string;

  @PrimaryColumn()
  variety!: string;
}
