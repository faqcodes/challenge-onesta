import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AppResponse } from '../../../shared/models/app-response.model';
import { ErrorItem } from '../../../shared/models/error-item.model';
import { CreateFruitUseCase } from '../../application/fruit.usecase';
import { Fruit } from '../../domain/fruit.entity';
import { fruitSchema } from './fruit.schema';

@injectable()
export class FruitController {
  constructor(private createFruitUseCase: CreateFruitUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const validationResult = fruitSchema.safeParse(req.body);

    if (validationResult.success === false) {
      const details: ErrorItem[] = validationResult.error.errors.map((e: any) => {
        return { message: `${e.path.join(',')}: ${e.message}` }
      });

      const errorResponse: AppResponse<Fruit> = {
        code: 'ERROR',
        message: `Error en la validación de datos de la fruta y sus variedades`,
        details
      };

      res.status(400).json(errorResponse);

      return;
    }

    const { fruit, variety } = validationResult.data;

    const result = await this.createFruitUseCase.execute(fruit, variety);

    if (result.isFailure()) {
      const errorResponse: AppResponse<Fruit> = {
        code: 'ERROR',
        message: `Error al crear la fruta y sus variedades`,
        details: result.getErrors()
      };

      res.status(400).json(errorResponse).end();

      return;
    }

    const successResponse: AppResponse<Fruit> = {
      code: 'SUCCESS',
      message: `Fruta creada correctamente`
    };

    res.status(201).json(successResponse);
  }
}
