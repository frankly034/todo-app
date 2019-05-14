import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },

    generateToken(id) {
        const token = jwt.sign({
          id,
        },
        process.env.SECRET, { expiresIn: '7d' });
        return token;
      },
}

export default Helper;