import model from '../models';
import Helper from '../helpers/helper';

const { User } = model;

class Users {
    static create(req, res) {
        const { firstname, lastname, email, password } = req.body;

        const hashPassword = Helper.hashPassword(password);

        const userValues = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPassword,
        }

        return User.create(userValues)
        .then(userData => {
            res.status(201).json({
                status: 201,
                message: 'User created successfully',
                data: userData,
            })
        })
        .catch(error => res.status(400).json({
            status: 400,
            error,
        }))
    }
}

export default Users;