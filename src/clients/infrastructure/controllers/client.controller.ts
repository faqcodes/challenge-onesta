import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AppResponse } from '../../../shared/models/app-response.model';
import { ErrorItem } from '../../../shared/models/error-item.model';
import { CreateClientUseCase } from '../../application/client.usecase';
import { Client } from '../../domain/client';
import { clientSchema } from './client.schema';

@injectable()
export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const validationResult = clientSchema.safeParse(req.body);

    if (validationResult.success === false) {
      const details: ErrorItem[] = validationResult.error.errors.map((e: any) => {
        return { message: `${e.path.join(',')}: ${e.message}` }
      });

      const errorResponse: AppResponse<Client> = {
        code: 'ERROR',
        message: `Error en la validación de datos del cliente. Revise los detalles para más informacón`,
        details
      };

      res.status(400).json(errorResponse);

      return;
    }

    const { email, first_name, last_name } = validationResult.data;

    const result = await this.createClientUseCase.execute(email, first_name, last_name);

    if (result.isFailure()) {
      const errorResponse: AppResponse<Client> = {
        code: 'ERROR',
        message: `Error al crear el Cliente`,
        details: result.getErrors()
      };

      res.status(400).json(errorResponse).end();

      return;
    }

    const successResponse: AppResponse<Client> = {
      code: 'SUCCESS',
      message: `El cliente ha sido creado satisfactoriamente`
    };

    res.status(201).json(successResponse);
  }
}
