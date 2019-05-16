import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
class Utility {
  static getToken(payload, expiresIn = '1d') {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn });
    return token;
  }

  static comparePassword(password, hash) {
   return bcrypt.compare(password, hash);
  }
}
export default Utility;
