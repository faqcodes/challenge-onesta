import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AppResponse } from '../../../shared/models/app-response.model';
import { ErrorItem } from '../../../shared/models/error-item.model';
import { CreateFarmerUseCase } from '../../application/farmer.usecase';
import { Farmer } from '../../domain/farmer';
import { farmerSchema } from './farmer.schema';

@injectable()
export class FarmerController {
  constructor(private createFarmerUseCase: CreateFarmerUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const validationResult = farmerSchema.safeParse(req.body);

    if (validationResult.success === false) {
      const details: ErrorItem[] = validationResult.error.errors.map((e: any) => {
        return { message: `${e.path.join(',')}: ${e.message}` }
      });

      const errorResponse: AppResponse<Farmer> = {
        code: 'ERROR',
        message: `Error en la validación de datos del agricultor. Revise los detalles para más informacón`,
        details
      };

      res.status(400).json(errorResponse);

      return;
    }

    const { email, first_name, last_name } = validationResult.data;

    const result = await this.createFarmerUseCase.execute(email, first_name, last_name);

    if (result.isFailure()) {
      const errorResponse: AppResponse<Farmer> = {
        code: 'ERROR',
        message: `Error al crear el Agricultor`,
        details: result.getErrors()
      };

      res.status(400).json(errorResponse).end();

      return;
    }

    const successResponse: AppResponse<Farmer> = {
      code: 'SUCCESS',
      message: `El agricultor ha sido creado satisfactoriamente`
    };

    res.status(201).json(successResponse);
  }
}
