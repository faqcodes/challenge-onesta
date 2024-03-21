import { Fruit } from './fruit.entity';

export interface FruitRepository {
  save(fruit: Fruit): Promise<void>;
}
