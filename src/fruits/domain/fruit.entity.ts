import { Variety } from './variety.entity';

export class Fruit {
  constructor(
    public fruit: string,
    public variety: Variety
  ) { }
}