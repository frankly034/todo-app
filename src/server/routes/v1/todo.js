import express from 'express';
import todoController from '../../controllers/todo';
import middlewares from '../../middlewares';

const todo = express.Router();

todo.post('/', middlewares.verifyUserToken, middlewares.validator.createTodo, todoController.create);
todo.get('/', middlewares.verifyUserToken, todoController.readAllTodos);
todo.get('/:id', middlewares.verifyUserToken, todoController.readATodo);
todo.patch(
  '/:id/completed',
  middlewares.verifyUserToken,
  middlewares.validator.updateCompleted,
  todoController.updateCompleted,
);
// todo.patch('/:todoId', middlewares.verifyUserToken, middlewares.validator.checkTodoIdParam, todoController.modify);

export default todo;
