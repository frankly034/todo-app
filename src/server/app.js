import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to TodoApp',
  });
});

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'This URL does not exist'
  });
});

server.listen(port, hostname, () =>{
  console.log(`server running at http://${hostname}:${port}`);
})