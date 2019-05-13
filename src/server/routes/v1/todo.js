import express from 'express';
import todoController from '../../controllers/todo';

const todo = express.Router();

todo.get('/id', todoController.replyId);

todo.post('/:userId', todoController.create);

export default todo;