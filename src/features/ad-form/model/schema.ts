import { z } from 'zod';

export const adFormSchema = z.object({
  type: z.enum(['lost', 'found']),
  species: z.string().min(1, 'Выберите вид животного'),
  name: z.string().min(2, 'Кличка должна быть не менее 2 символов'),
  description: z.string().min(10, 'Описание должно быть подробным (от 10 символов)'),
  location: z.string().min(5, 'Укажите точный адрес или район'),
  date: z.string().min(1, 'Укажите дату'),
  contact_phone: z.string().regex(/^\+?[0-9\s\-\(\)]{10,20}$/, 'Неверный формат телефона'),
  contact_name: z.string().optional(),
});

export type AdFormData = z.infer<typeof adFormSchema>;