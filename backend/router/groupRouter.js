import { Router } from 'express';

import groupController from '../controllers/groupController.js';
import subjectController from '../controllers/subjectController.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';

const groupRouter = Router();

groupRouter.post('/createGroup', authMiddleware, roleMiddleware(['ADMIN']), groupController.create);

groupRouter.post(
  '/createSubject',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  subjectController.create,
);

groupRouter.get('/getAll', authMiddleware, roleMiddleware(['ADMIN']), groupController.getAll);

groupRouter.get(
  '/abiturs',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  groupController.getAbiturient,
);
groupRouter.get('/getTeach', authMiddleware, roleMiddleware(['ADMIN']), groupController.getTeach);
groupRouter.get(
  '/getSubject',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  groupController.getAllSubject,
);
groupRouter.get('/get/:id', authMiddleware, roleMiddleware(['ADMIN']), groupController.getById);

groupRouter.delete(
  '/removegroup/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  groupController.removegroup,
);

groupRouter.patch(
  '/updategroup/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  groupController.updategroup,
);

export default groupRouter;
