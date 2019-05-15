import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Utility {
  static getToken(payload, expiresIn = '1d') {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn });
    return token;
  }
}
export default Utility;
