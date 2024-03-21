import { injectable } from 'tsyringe';
import { Fruit } from '../../domain/fruit.entity';
import { FruitRepository } from '../../domain/fruit.repository';

@injectable()
export class SQLiteFruitRepository implements FruitRepository {
  save(fruit: Fruit): Promise<void> {
    throw new Error('Method not implemented.');
  }
}