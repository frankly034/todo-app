import express from 'express';
import authController from '../../controllers/auth';
import middlewares from '../../middlewares';

const auth = express.Router();
auth.post('/signup', middlewares.validator.signup, authController.signup);

export default auth;
