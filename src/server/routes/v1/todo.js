import express from 'express';
import todoController from '../../controllers/todo';
import middlewares from '../../middlewares';

const todo = express.Router();

todo.post('/', middlewares.verifyUserToken, todoController.create);
todo.get('/', middlewares.verifyUserToken, todoController.readAllTodos);
todo.get('/:id', middlewares.verifyUserToken, todoController.readATodo);
todo.patch(
  '/:id/completed',
  middlewares.verifyUserToken,
  middlewares.validator.updateCompleted,
  todoController.updateCompleted,
);

export default todo;
