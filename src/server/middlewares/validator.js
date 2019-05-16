import Validator from 'validatorjs';
import DisplayError from './displayAuthError';

class Validate {
  static signup(req, res, next) {
    const {
      email, firstName, lastName, password,
    } = req.body;

    const data = {
      email,
      firstName,
      lastName,
      password,
    };

    const rules = {
      email: 'required|email',
      firstName: 'required|string|alpha',
      lastName: 'required|string|alpha',
      password: 'required|string|min:8',
    };

    const validation = new Validator(data, rules);
    if (validation.passes()) {
      next();
    } else {
      const err = {
        statusCode: 400,
        message: validation.errors.all(),
      };
      DisplayError(err, res);
    }
  }

  static createTodo (req, res, next){
    const { title, description, completed } = req.body;
    const data = { title, description, completed };
    const rules = {
      title: 'required|string', 
      description: 'required|string', 
      completed: 'required|max:5'
    };
    const validation = new Validator(data, rules);
    if(validation.passes()){
      next();
    } else {
      const err = {
        statusCode: 400,
        message: validation.errors.all()
      };
      DisplayError(err, res);
    }
  }

  static checkTodoIdParam (req, res, next) {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const data = { title, description, todoId };

    const rules = {
      todoId: 'required|integer',
      title: 'string',
      descritpion: 'string'
    };
    const validation = new Validator(data, rules);
    if(validation.passes()){
      next();
    } else {
      const err = {
        statusCode: 400,
        message: validation.errors.all()
      };
      DisplayError(err, res);
    }
  }
}
export default Validate;
