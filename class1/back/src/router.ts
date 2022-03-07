import express from 'express';
import errorHandler from './utils/errorHandler';

import user from './routes/user';
import note from './routes/note';

const router = express.Router();

router.use('/user', user);
router.use('/note', note);

router.use(errorHandler);

export default router;