import model from '../../db/models';
import Utility from '../utilities';

const { User } = model;

class auth {
  static signup(req, res) {
    const { firstName, lastName, password } = req.body;
    let { email } = req.body;
    email = email.toLowerCase();
    return User.findOrCreate({
      where: { email },
      defaults: {
        first_name: firstName,
        last_name: lastName,
        password,
      },
    })
      .then(([, created]) => {
        if (!created) {
          res.status(409).send({
            status: 409,
            data: 'Email already exist!',
          });
        } else {
          const token = Utility.getToken({ email, firstName, lastName });
          res.status(201).send({
            status: 201,
            data: [
              {
                email,
                firstName,
                lastName,
                token,
              },
            ],
          });
        }
      })
      .catch(e => res.status(400).send({ status: 400, error: `Bad request ${e}` }));
  }
}

export default auth;
