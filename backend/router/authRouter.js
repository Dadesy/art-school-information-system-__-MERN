import { Router } from 'express';

import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';
import { registerValidation, loginValidation } from '../validations/authValidations.js';

const authRouter = Router();

authRouter.post('/registration', registerValidation, userController.register);
authRouter.post('/login', loginValidation, userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/users', authMiddleware, roleMiddleware(['ADMIN']), userController.getUser);

export default authRouter;
