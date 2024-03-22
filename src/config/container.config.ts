
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateFruitUseCase } from '../fruits/application/fruit.usecase';
import { SQLiteFruitRepository } from '../fruits/infrastructure/repositories/fruit.repository';

container.register('FruitUseCase', { useClass: CreateFruitUseCase });
container.register('FruitRepository', { useClass: SQLiteFruitRepository });

export { container };

