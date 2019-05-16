import express from 'express';
import authController from '../../controllers/auth';
import middlewares from '../../middlewares';

const auth = express.Router();
auth.post('/signup', middlewares.validator.signup, authController.signup);

auth.post('/login', middlewares.validator.login, authController.login);

export default auth;
