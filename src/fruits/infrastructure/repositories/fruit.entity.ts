import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Fruit')
export class FruitEntity {
  @PrimaryColumn()
  fruit!: string;

  @PrimaryColumn()
  variety!: string;
}
