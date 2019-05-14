import model from '../../db/models';

const { Todo } = model;

class Todos {
  static replyId(req, res) {
    return res.status(200).send({ message: 'Yay!!!' });
  }

  static create(req, res) {
    const { title, description, completed } = req.body;
    const { userId } = req.params;
    return Todo.create({
      title, description, completed, userId,
    })
      .then((todoData) => {
        res.status(201)
          .send({
            status: 201,
            data: todoData,
          });
      })
      .catch(e => res.status(400).send({ status: 400, error: `Bad request ${e}` }));
  }
}

export default Todos;
