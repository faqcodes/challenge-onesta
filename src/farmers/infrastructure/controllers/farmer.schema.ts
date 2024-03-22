import { z } from 'zod';

const fieldArray = z.object({
  name: z.string().min(1),
  location: z.string().min(1)
});

export const farmerSchema = z.object({
  email: z.string().email().min(1),       // Campo 'farmer' es requerido y no vacía
  first_name: z.string().min(1),          // Campo 'first_name' es requerido y no vacía
  last_name: z.string().min(1),           // Campo 'last_name' es requerido y no vacía
  fields: z.array(fieldArray).optional()  // Campo 'fields' inicialmente opcional
});