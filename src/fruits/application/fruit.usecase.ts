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
      const fruitEntity: Fruit = new Fruit(fruit, variety);

      await this.fruitRepository.save(fruitEntity);

      return Result.success<Fruit>(fruitEntity);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Fruit>([details])
    }
  }
}