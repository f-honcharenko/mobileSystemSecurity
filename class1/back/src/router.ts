import express from 'express';
import errorHandler from './utils/errorHandler';

import user from './routes/user';
import note from './routes/note';
import crypto from './routes/crypto';

const router = express.Router();

router.use('/user', user);
router.use('/note', note);
router.use('/crypto', crypto);

router.use(errorHandler);

export default router;