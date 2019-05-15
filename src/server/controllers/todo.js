import model from '../../db/models';

const Todo = model.Todos;

class Todos {
  static create(req, res) {
    const { title, description, completed } = req.body;
    const { userId } = req.params;
    return Todo.create({
      title,
      description,
      completed,
      userId,
    })
      .then((todoData) => {
        res.status(201).send({
          status: 201,
          data: todoData,
        });
      })
      .catch(e => res.status(400).send({ status: 400, error: `Bad request ${e}` }));
  }

  static readAllTodos(req, res) {
    Todo.findAll({
      where: {
        user_id: req.userId,
      },
    })
      .then(todos => res.status(200).json({
        status: 201,
        data: todos,
      }))
      .catch(error => res.status(500).send(error));
  }

  static readATodo(req, res) {
    Todo.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then(todos => res.status(200).json({
        status: 200,
        data: todos,
      }))
      .catch(error => res.status(500).send(error));
  }

  static modify(req, res) {
    const { title, description, completed } = req.body;
    const todoId = req.params.todoId;
    return Todo.findByPk(todoId)
      .then(todo => todo.update({
        title: title || todo.title,
        description: description || todo.description,
        completed: completed || todo.completed,
      }))
      .then(updatedTodo => res.status(200).send({
        status: 200,
        message: 'Todo successfully updated',
        data: updatedTodo
      }))
      .catch(e => res.status(404).send({
        status: 404,
        message: 'Todo not found.'
      }));
  }
}

export default Todos;
