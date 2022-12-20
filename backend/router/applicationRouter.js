import { Router } from 'express';

import applicationController from '../controllers/applicationController.js';
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';

const applicationRouter = Router();

applicationRouter.post('/createApplication', authMiddleware, applicationController.create);

applicationRouter.get('/getMyApplication', authMiddleware, applicationController.getMyApplication);

applicationRouter.get(
  '/getAll',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  applicationController.getAll,
);

applicationRouter.get(
  '/get/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  applicationController.getById,
);

applicationRouter.delete(
  '/removeApplication/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  applicationController.removeApplication,
);

applicationRouter.patch(
  '/updateApplication/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  applicationController.updateApplication,
);

applicationRouter.get(
  '/getStatus',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  applicationController.getStatus,
);

export default applicationRouter;
