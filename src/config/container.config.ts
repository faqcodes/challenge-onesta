
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateClientUseCase } from '../clients/application/client.usecase';
import { SQLiteClientRepository } from '../clients/infrastructure/repositories/client.repository';
import { CreateFarmerUseCase } from '../farmers/application/farmer.usecase';
import { SQLiteFarmerRepository } from '../farmers/infrastructure/repositories/farmer.repository';
import { CreateFruitUseCase } from '../fruits/application/fruit.usecase';
import { SQLiteFruitRepository } from '../fruits/infrastructure/repositories/fruit.repository';
import { CreateHarvestUseCase } from '../harvests/application/harvest.usecase';
import { SQLiteFieldRepository } from '../harvests/infrastructure/repositories/field.repository';
import { SQLiteHarvestRepository } from '../harvests/infrastructure/repositories/harvest.repository';

container.register('FruitUseCase', { useClass: CreateFruitUseCase });
container.register('FruitRepository', { useClass: SQLiteFruitRepository });

container.register('FarmerUseCase', { useClass: CreateFarmerUseCase });
container.register('FarmerRepository', { useClass: SQLiteFarmerRepository });

container.register('ClientUseCase', { useClass: CreateClientUseCase });
container.register('ClientRepository', { useClass: SQLiteClientRepository });

container.register('FieldRepository', { useClass: SQLiteFieldRepository });

container.register('HarvestUseCase', { useClass: CreateHarvestUseCase });
container.register('HarvestRepository', { useClass: SQLiteHarvestRepository });

export { container };

