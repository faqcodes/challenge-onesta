import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AppResponse } from '../../../shared/models/app-response.model';
import { CreateFruitUseCase } from '../../application/fruit.usecase';
import { Fruit } from '../../domain/fruit.entity';

@injectable()
export class FruitController {
  constructor(private createFruitUseCase: CreateFruitUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const { fruit, variety } = req.body;

    const result = await this.createFruitUseCase.execute(fruit, variety);

    if (result.isFailure()) {
      const errorResponse: AppResponse<Fruit> = {
        code: 'ERROR',
        message: `Error al crear la fruta y sus variedades`,
        errors: result.getErrors()
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
