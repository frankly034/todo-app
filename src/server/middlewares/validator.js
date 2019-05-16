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

  static updateCompleted(req, res, next) {
    const { id } = req.params;
    const data = { id };
    const rules = { id: 'required|integer|min:1' };
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

  static login(req, res, next) {
    const { email, password } = req.body;

    const data = {
      email, password
    };

    const rules = {
      email: 'required|email',
      password: 'required'
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
}
export default Validate;
