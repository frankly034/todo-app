import express from 'express';
import routerV1 from './v1';

const router = express.Router();

router.use('/api/v1', routerV1);

    // app.get('/api', (req, res) => 
    //     res.status(200)
    //         .send({
    //             message: 'Welcome to Todo API'
    //         }));

    // app.post('/api/todos', Todos.create);

export default router;