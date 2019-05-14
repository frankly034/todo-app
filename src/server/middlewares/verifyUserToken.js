import jwt from 'jsonwebtoken';
import model from '../models';

const { User } = model;

/**
 * Authorization: Bearer <access_token>
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object}
 *
 * @exports verifyUserToken
 */

const verifyUserToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    return next(err);
  }

  if (token === undefined || token === null) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    return next(err);
  }

  let decoded;

  try {
    decoded = jwt.verify(token);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = Error('Expired user authorization token');
      error.statusCode = 401;
      return next(error);
    }
    const error = Error('Invalid user authorization token');
    error.statusCode = 401;
    return next(error);
  }
  const { id } = decoded.id;
  return User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid user authorization token',
        });
      }
      req.userId = decoded.id;
      return next();
    })
    .catch(e => res.status(400).send({ status: 500, error: `Bad request ${e}` }));
};

export default verifyUserToken;
