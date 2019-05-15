import model from '../../db/models';

const { Todos } = model;

class Todo {

  static create(req, res) {
    const { title, description, completed } = req.body;
    const user_id = req.userId;
    return Todos.create({
      title, description, completed, user_id,
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

  static modify(req, res) {
    const { title, description, completed } = req.body;
    const todoId = req.params.todoId;
    return Todos.findByPk(todoId)
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

export default Todo;
