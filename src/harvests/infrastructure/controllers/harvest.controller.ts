import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AppResponse } from '../../../shared/models/app-response.model';
import { ErrorItem } from '../../../shared/models/error-item.model';
import { CreateHarvestUseCase } from '../../application/harvest.usecase';
import { Harvest } from '../../domain/harvest';
import { harvestSchema } from './harvest.schema';

@injectable()
export class HarvestController {
  constructor(private createHarvestUseCase: CreateHarvestUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const validationResult = harvestSchema.safeParse(req.body);

    if (validationResult.success === false) {
      const details: ErrorItem[] = validationResult.error.errors.map((e: any) => {
        return { message: `${e.path.join(',')}: ${e.message}` }
      });

      const errorResponse: AppResponse<Harvest> = {
        code: 'ERROR',
        message: `Error en la validación de datos de la cosecha. Revise los detalles para más informacón`,
        details
      };

      res.status(400).json(errorResponse);

      return;
    }

    const { field_name, field_location, client_email, fruit, variety } = validationResult.data;

    const result = await this.createHarvestUseCase.execute(field_name, field_location, client_email, fruit, variety);

    if (result.isFailure()) {
      const errorResponse: AppResponse<Harvest> = {
        code: 'ERROR',
        message: `Error al crear la Cosecha. Revise los detalles para más informacón`,
        details: result.getErrors()
      };

      res.status(400).json(errorResponse).end();

      return;
    }

    const successResponse: AppResponse<Harvest> = {
      code: 'SUCCESS',
      message: `La Cosecha ha sido creada satisfactoriamente`
    };

    res.status(201).json(successResponse);
  }
}
