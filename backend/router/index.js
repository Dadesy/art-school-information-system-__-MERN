import { Router } from 'express';

import authRouter from './authRouter.js';
import groupRouter from './groupRouter.js';
import applicationRouter from './applicationRouter.js';

const router = new Router();

router.use('/application', applicationRouter);
router.use('/group', groupRouter);
router.use('/auth', authRouter);

export default router;
