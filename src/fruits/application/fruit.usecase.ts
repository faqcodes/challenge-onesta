import { inject, injectable } from 'tsyringe';
import { ErrorItem } from '../../shared/models/error-item.model';
import { Result } from '../../shared/models/result.model';
import { Fruit } from '../domain/fruit';
import { FruitRepository } from '../domain/fruit.repository';

@injectable()
export class CreateFruitUseCase {
  constructor(
    @inject('FruitRepository')
    private readonly fruitRepository: FruitRepository
  ) { }

  async execute(fruit: string, variety: string): Promise<Result<Fruit>> {
    try {
      const fruitData = await this.fruitRepository.findOneBy(fruit, variety);
      if (fruitData) {
        // Do nothing: the save method in repository update the record
        console.log('Fruit Exists:', fruitData);
      }

      const fruitEntity: Fruit = new Fruit(fruit, variety);

      await this.fruitRepository.save(fruitEntity);

      return Result.success<Fruit>(fruitEntity);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Fruit>([details])
    }
  }
}