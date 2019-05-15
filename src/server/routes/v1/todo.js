import express from 'express';
import todoController from '../../controllers/todo';
import middlewares from '../../middlewares';

const todo = express.Router();

todo.get('/id', todoController.replyId);

todo.post('/', middlewares.verifyUserToken, todoController.create);

export default todo;
