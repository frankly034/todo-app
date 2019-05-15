import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class Utility {
  static getToken(payload, expiresIn = '1d') {
    dotenv.config();
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn });
    return token;
  }
}
export default Utility;
