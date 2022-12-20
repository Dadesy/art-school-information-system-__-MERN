import { body } from 'express-validator';

export const productValidation = [
  body('name', 'Введите название').isLength({ min: 3 }).isString(),
  body('description', 'Введите описание').isLength({ min: 10 }).isString(),
  body('price', 'Цена должна быть числом').isNumeric({ min: 3 }).isString(),
  body('imageUrl', 'неверная ссылка на изображение').optional().isString(),
];
