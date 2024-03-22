import 'reflect-metadata';

import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { ClientController } from './clients/infrastructure/controllers/client.controller';
import { container } from './config/container.config';
import { AppDataSource } from './data-source';
import { FarmerController } from './farmers/infrastructure/controllers/famer.controller';
import { FruitController } from './fruits/infrastructure/controllers/fruit.controller';
import { HarvestController } from './harvests/infrastructure/controllers/harvest.controller';
import { AppResponse } from './shared/models/app-response.model';

AppDataSource.initialize()
  .then(() => {

    const app: Application = express();
    const port = 3000;

    // Middleware para parsear el body de las solicitudes
    app.use(bodyParser.json());
    app.get('/', (req: Request, res: Response) => res.status(200).send('Onesta Challenge API'));

    // Controllers
    const fruitController = container.resolve(FruitController);
    const farmerController = container.resolve(FarmerController);
    const clientController = container.resolve(ClientController);
    const harvestController = container.resolve(HarvestController);

    // Routes
    app.post('/api/fruits', (req: Request, res: Response) => fruitController.create(req, res));
    app.post('/api/farmers', (req: Request, res: Response) => farmerController.create(req, res));
    app.post('/api/clients', (req: Request, res: Response) => clientController.create(req, res));
    app.post('/api/harvests', (req: Request, res: Response) => harvestController.create(req, res));

    // Generel errors
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

  }).catch((error: any) => console.log("TypeORM connection error: ", error));