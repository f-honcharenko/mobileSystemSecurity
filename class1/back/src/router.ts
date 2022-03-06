import express from 'express';
import errorHandler from './utils/errorHandler';
import user from './routes/user';
const router = express.Router();

router.use('/user', user);
router.use(errorHandler);

export default router;