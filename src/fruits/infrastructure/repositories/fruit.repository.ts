import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
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

    const fruitRepository = AppDataSource.getRepository(FruitEntity);
    const result = await fruitRepository.save(fruitEntity);

    // TODO: Map to business entity

    return fruit;
  }

  async findOneBy(fruit: string, variety: string): Promise<Fruit | null> {
    const fruitRepository = AppDataSource.getRepository(FruitEntity);
    const result = await fruitRepository.findOneBy({ fruit, variety });

    if (result) {
      return {
        fruit: result.fruit,
        variety: result.variety
      }
    }

    return null;
  }
}
