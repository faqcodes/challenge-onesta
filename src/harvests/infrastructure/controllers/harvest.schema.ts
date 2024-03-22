import { z } from 'zod';
import { Variety } from '../../../fruits/domain/variety';

const varietyEnum = z.nativeEnum(Variety);
type varietyEnum = z.infer<typeof varietyEnum>;

export const harvestSchema = z.object({
  field_name: z.string().min(1),          // Campo 'field_name' es requerido y no vacía
  field_location: z.string().min(1),      // Campo 'field_location' es requerido y no vacía
  client_email: z.string().email().min(1),// Campo 'client_email' es requerido y no vacía
  fruit: z.string().min(1),               // Campo 'fruit' es requerido y no vacía
  variety: varietyEnum                    // Campo 'variety' es requerido y debe corresponder al enum Variety
});