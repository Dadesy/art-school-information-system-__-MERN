import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('userName').isLength({ min: 5, max: 32 }),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5, max: 32 }),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5, max: 32 }),
];
