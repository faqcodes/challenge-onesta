import 'reflect-metadata';

import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { createConnection } from "typeorm";
import { container } from './config/container.config';
import { FruitController } from './fruits/infrastructure/controllers/fruit.controller';
import { AppResponse } from './shared/models/app-response.model';

createConnection().then(async connection => {

  const app: Application = express();
  const port = 3000;

  // Middleware para parsear el body de las solicitudes
  app.use(bodyParser.json());
  app.get('/', (req: Request, res: Response) => res.status(200).send('Onesta Challenge API'));

  const fruitController = container.resolve(FruitController);

  app.post('/api/fruits', (req: Request, res: Response) => fruitController.create(req, res));

  app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    const error: AppResponse<void> = {
      code: 'ERROR',
      message: 'Ha ocurrido un error no controlado en la aplicación!',
      details: [{
        message: err.stack || ''
      }]
    }
    res.status(500).send(error);
  });

  app.listen(port, () => {
    console.log(`Onesta Challenge API is running on port: ${port}`);
  });
}).catch(error => console.log("TypeORM connection error: ", error));