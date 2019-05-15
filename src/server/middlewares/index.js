import verifyUserToken from './verifyUserToken';
import validator from './validator';
import checkAuth from './checkAuth';

const middlewares = { verifyUserToken, validator, checkAuth };
export default middlewares;
