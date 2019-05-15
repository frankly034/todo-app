import express from 'express';
import todoController from '../../controllers/todo';

const todo = express.Router();

todo.post('/', todoController.create);
todo.patch('/:todoId', todoController.modify);

export default todo;