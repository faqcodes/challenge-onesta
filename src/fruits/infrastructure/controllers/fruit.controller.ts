import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CreateFruitUseCase } from '../../application/fruit.usecase';

@injectable()
export class FruitController {
  constructor(private createFruitUseCase: CreateFruitUseCase) { }

  async create(req: Request, res: Response): Promise<void> {
    const { fruit, variety } = req.body;

    try {
      await this.createFruitUseCase.execute(fruit, variety);
      res.status(201).json({ message: 'Fruta creada correctamente' });
    } catch (error) {
      res.status(500).json({ message: `Error al crear la fruta y sus variedades: ${error}` });
    }
  }
}
