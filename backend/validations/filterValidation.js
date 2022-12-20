import { body } from 'express-validator';

export const typeValidation = [
  body('title', 'Тип  должен содержать минимум 3 символа').isLength({ min: 3, max: 32 }),
];
