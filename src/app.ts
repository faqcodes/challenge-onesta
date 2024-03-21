import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import 'reflect-metadata'; // Importante para el uso de decoradores en Tsyringe
import { container } from './config/container.config';
import { FruitController } from './fruits/infrastructure/controllers/fruit.controller';

const app: Application = express();
const port = 3000;

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => res.status(200).send('Onesta Challenge API'));

const fruitController = container.resolve(FruitController);

app.post('/api/fruits', (req: Request, res: Response) => fruitController.create(req, res));

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
