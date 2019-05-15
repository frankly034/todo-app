import express from 'express';
import todo from './todo';

const routerV1 = express.Router();

routerV1.use('/todos', todo);

export default routerV1;