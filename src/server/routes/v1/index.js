import express from 'express';
import todo from './todo';
import auth from './auth';

const routerV1 = express.Router();

routerV1.use('/todos', todo);
routerV1.use('/auth', auth);

export default routerV1;
