import { z } from 'zod';
import { Variety } from '../../domain/variety';

const varietyEnum = z.nativeEnum(Variety);
type varietyEnum = z.infer<typeof varietyEnum>;

export const fruitSchema = z.object({
  fruit: z.string().nonempty(), // Campo 'fruit' es requerido y debe ser una cadena no vacía
  variety: varietyEnum, // Campo 'variety' es requerido y debe corresponder al enum Variety
});