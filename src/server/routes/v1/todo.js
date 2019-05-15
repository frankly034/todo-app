import express from 'express';
import todoController from '../../controllers/todo';
import middlewares from '../../middlewares';

const todo = express.Router();

todo.post('/', middlewares.verifyUserToken, todoController.create);
todo.get('/', middlewares.verifyUserToken, todoController.readAllTodos);
todo.get('/:id', middlewares.verifyUserToken, todoController.readATodo);
todo.patch('/:todoId', middlewares.verifyUserToken, todoController.modify);

export default todo;
