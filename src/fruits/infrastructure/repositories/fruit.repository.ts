import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import { Fruit } from '../../domain/fruit';
import { FruitRepository } from '../../domain/fruit.repository';
import { FruitEntity } from './fruit.entity';

@injectable()
export class SQLiteFruitRepository implements FruitRepository {

  async save(fruit: Fruit): Promise<Fruit> {
    // Map to data entity
    const fruitEntity: FruitEntity = {
      fruit: fruit.fruit,
      variety: fruit.variety
    };
    const fruitRepository = getRepository(FruitEntity);
    const result = await fruitRepository.save(fruitEntity);

    // TODO: Map to business entity

    return fruit;
  }
}
