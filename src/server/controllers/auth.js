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

  static login(req, res) {
    const { password } = req.body;
    
    let { email } = req.body;
    email = email.toLowerCase();

    return User.findOne({ where: { email } })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({
            status: 404,
            message: "User with this Email not found",
          })
        }

        Utility.comparePassword(password, foundUser.password)
          .then((result) => {
            if (result === false) {
              return res.status(400).json({
                status: 400,
                message: "Incorrect password",
              })
            }

            const id = foundUser.id;

            const token = Utility.getToken({ id });
            res.status(200).json({
              status: 200,
              message: "Login Successful",
              token,
            })
          })
      })
      .catch(e => res.status(400).send({ status: 400, error: `Bad request ${e}` }));
  }
}

export default auth;
