import { Request, Response } from 'express';
import readline from 'readline';
import { Readable } from 'stream';
import { injectable } from 'tsyringe';
import { Client } from '../../../clients/domain/client';
import { clientSchema } from '../../../clients/infrastructure/controllers/client.schema';
import { Farmer } from '../../../farmers/domain/farmer';
import { Field } from '../../../farmers/domain/field';
import { farmerSchema, fieldSchema } from '../../../farmers/infrastructure/controllers/farmer.schema';
import { Fruit } from '../../../fruits/domain/fruit';
import { fruitSchema } from '../../../fruits/infrastructure/controllers/fruit.schema';
import { AppResponse } from '../../../shared/models/app-response.model';
import { ErrorItem } from '../../../shared/models/error-item.model';
import { UploadUseCase } from '../../application/upload.usecase';
import { Upload } from '../../domain/upload';

@injectable()
export class UploadController {
  constructor(
    public readonly uploadUseCase: UploadUseCase
  ) { }

  async upload(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      const errorFile: AppResponse<void> = {
        code: 'ERROR',
        message: `No se encontró el archivo`
      };

      res.status(400).json(errorFile);
      return;
    }

    const bufferStream = new Readable();

    bufferStream.push(req.file?.buffer);
    bufferStream.push(null);

    // Crear una interfaz de lectura de línea por línea
    const lineReader = readline.createInterface({
      input: bufferStream,
      crlfDelay: Infinity
    });

    let index = -1;
    const lines: any[] = [];
    const generalErrors: any[] = [];

    // Manejar cada línea del archivo según la estructura del archivo
    lineReader.on('line', async (line) => {
      index++;

      if (index === 0) return;

      const errors: any[] = [];
      const data = line.split(';');

      const farmerValidation = farmerSchema.safeParse({ email: data[0], first_name: data[1], last_name: data[2] });
      const clientValidation = clientSchema.safeParse({ email: data[3], first_name: data[4], last_name: data[5] });
      const fieldValidation = fieldSchema.safeParse({ name: data[6], location: data[7] });
      const fruitValidation = fruitSchema.safeParse({ fruit: data[8], variety: data[9] });

      if (farmerValidation.success === false) {
        const details: ErrorItem[] = farmerValidation.error.errors.map((e: any) => {
          return { message: `${e.path.join(',')}: ${e.message}` }
        });
        errors.push({ entity: 'Farmer', details });
      }

      if (clientValidation.success === false) {
        const details: ErrorItem[] = clientValidation.error.errors.map((e: any) => {
          return { message: `${e.path.join(',')}: ${e.message}` }
        });
        errors.push({ entity: 'Client', details });
      }

      if (fieldValidation.success === false) {
        const details: ErrorItem[] = fieldValidation.error.errors.map((e: any) => {
          return { message: `${e.path.join(',')}: ${e.message}` }
        });
        errors.push({ entity: 'Field', details });
      }

      if (fruitValidation.success === false) {
        const details: ErrorItem[] = fruitValidation.error.errors.map((e: any) => {
          return { message: `${e.path.join(',')}: ${e.message}` }
        });
        errors.push({ entity: 'Fruit', details });
      }

      if (errors.length > 0) {
        generalErrors.push({ line: index, errors });
      }

      // necesario para obtener .data ("strict": true)
      const success = farmerValidation.success &&
        fieldValidation.success &&
        clientValidation.success &&
        fruitValidation.success;

      if (success) {
        const farmer: Farmer = farmerValidation.data as Farmer;
        const field: Field = fieldValidation.data as Field;
        const client: Client = clientValidation.data as Client;
        const fruit: Fruit = fruitValidation.data as Fruit;

        farmer.fields = [field];

        const entities: Upload = { farmer, client, fruit };

        lines.push(entities);
      }
    });

    lineReader.on('close', async () => {
      let index = 1;
      for await (const entity of lines) {
        const result = await this.uploadUseCase.execute(entity);
        if (result.isFailure()) {
          console.log('fallas en caso de uso');
          generalErrors.push({ line: index, errors: result.getErrors() });
        }
        index++;
      }

      let code = 'SUCCESS';
      let message = `Los datos se han creado satisfactoriamente`;

      if (generalErrors.length > 0) {
        code = 'WARNING';
        message = `Algunos de los datos no se han creado. Para más información revise los detalles`;
      }

      const successResponse: AppResponse<void> = { code, message, details: generalErrors };

      res.status(200).json(successResponse);

      return;
    });
  }
}
