import Todos from '../controllers/todo';

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({message: 'Welcome to Todo API'}));

    app.post('/api/todos', Todos.create);
}