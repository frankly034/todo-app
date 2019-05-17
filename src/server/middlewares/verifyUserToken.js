import jwt from 'jsonwebtoken';
import model from '../../db/models';
import displayAuthError from './displayAuthError';

const { User } = model;


const verifyUserToken = (req, res, next) => {
  const token = req.header('token') || req.headers['x-access-token'];
  if (!token) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    return displayAuthError(err, res);
  }

  if (token === undefined || token === null) {
    const err = Error('User authorization token is required');
    err.statusCode = 401;
    return displayAuthError(err, res);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = Error('Expired user authorization token');
      error.statusCode = 401;
      return displayAuthError(err, res);
    }
    const error = Error('Invalid user authorization token');
    error.statusCode = 401;
    return displayAuthError(err, res);
  }
  const { id } = decoded.payload;
  return User.findOne({
    where: {
      id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid user authorization token',
        });
      }
      req.userId = id;
      return next();
    })
    .catch(e => res.status(400).send({ status: 500, error: `Bad request ${e}` }));
};

export default verifyUserToken;
