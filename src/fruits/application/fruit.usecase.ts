import { inject, injectable } from 'tsyringe';
import { Fruit } from '../domain/fruit.entity';
import { FruitRepository } from '../domain/fruit.repository';
import { Variety } from '../domain/variety.entity';

@injectable()
export class CreateFruitUseCase {
  constructor(
    @inject('FruitRepository')
    private readonly fruitRepository: FruitRepository
  ) { }

  async execute(fruit: string, variety: string): Promise<void> {
    try {
      const varietyEntity: Variety = Variety[variety as keyof typeof Variety];
      const fruitEntity: Fruit = new Fruit(fruit, varietyEntity);

      await this.fruitRepository.save(fruitEntity);
    } catch (error) {
      throw new Error(`Error al crear la fruta y su variedad, ${error}`);
    }
  }
}