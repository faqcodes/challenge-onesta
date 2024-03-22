import { z } from 'zod';

export const clientSchema = z.object({
  email: z.string().email().nonempty(), // Campo 'client' es requerido y no vacía
  first_name: z.string().nonempty(), // Campo 'first_name' es requerido y no vacía
  last_name: z.string().nonempty(), // Campo 'last_name' es requerido y no vacía
});