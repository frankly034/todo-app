import express from 'express';
import todoController from '../../controllers/todo';
// import userController from '../../controllers/user';

const todo = express.Router();

todo.get('/id', todoController.replyId);

todo.post('/:userId', todoController.create);

export default todo;