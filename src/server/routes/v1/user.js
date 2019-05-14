import express from 'express';
import userController from '../../controllers/user';

const user = express.Router();

user.post('/signup', userController.create);

export default user;