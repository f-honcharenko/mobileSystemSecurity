import express from 'express';
import errorHandler from './utils/errorHandler';
import auth from './services/auth';
const routers = express.Router();

routers.use('/auth', auth);
routers.use(errorHandler);

export default routers;