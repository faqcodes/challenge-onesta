import { Fruit } from './fruit';

export interface FruitRepository {
  save(fruit: Fruit): Promise<Fruit>;
  findOneBy(fruit: string, variety: string): Promise<Fruit | null>;
}
