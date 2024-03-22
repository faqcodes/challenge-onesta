import { Fruit } from './fruit';

export interface FruitRepository {
  save(fruit: Fruit): Promise<Fruit>;
}
