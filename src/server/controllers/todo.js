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

  static updateCompleted(req, res) {
    const todoId = req.params.id;
    const { userId } = req;
    Todo.update(
      {
        completed: true,
      },
      {
        where: {
          id: todoId,
          user_id: userId,
        },
      },
    )
      .then(([todo]) => {
        if (todo) {
          res.status(200).json({
            status: 200,
            data: `Todo with id ${todoId} is marked completed successfully`,
          });
        } else {
          res.status(400).json({
            error: 400,
            message: `Todo with the id ${todoId} does not exist`,
          });
        }
      })
      .catch(error => res.status(500).send(error));
  }

  static modify(req, res) {
    const { title, description } = req.body;
    const { todoId } = req.params;
    const { userId } = req;

    return Todo.findOne({
      where: {
        user_id: userId,
        id: todoId,
      },
    })
      .then((todo) => {
        if (!todo) { throw new Error('Todo not found.'); }
        return todo.update({
          title: title || todo.title,
          description: description || todo.description,
        });
      })
      .then(updatedTodo => res.status(200).send({
        status: 200,
        message: 'Todo successfully updated',
        data: updatedTodo,
      }))
      .catch(e => res.status(400).send({ status: 400, message: `Failed to find the actual todo ${e}` }));
  }
}

export default Todos;
