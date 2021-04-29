const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const models = require('./models');

const { Todo } = models;

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  } catch (e) {
    res.status(500).send({ message: 'Todo list cannot be read!' });
  }
});

app.post('/todos', bodyParser.json(), async (req, res) => {
  const todo = new Todo({
    taskText: req.body.taskText,
    isDone: false,
  });

  try {
    await todo.save();
    res.send(todo);
  } catch (e) {
    res.status(500).send({ message: 'Todo cannot be created!' });
  }
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  todo.isDone = !req.body.isDone;
  const data = await todo.save();
  res.send(data);
});

app.delete('/todos', bodyParser.json(), async (req, res) => {

  if (req.body.length !== 0) {
    try {
      console.log(req.body);
        await Todo.destroy({ where: { id: req.body } });
      res.status(204).send();
    } catch (e) {
      res.status(404).send({ message: "Todos doesn't exist!" });
    }
    return Promise.resolve();
  }

  if (req.body.length === 0) {
    try {
      await Todo.destroy({
        where: {},
        truncate: true,
      });
      res.status(204).send();
    } catch (e) {
      res.status(404).send({ message: "Todos doesn't exist!" });
    }
    return Promise.resolve();
  }
});

// The 404 Route (ALWAYS Keep this as the last route)
app.use((req, res) => {
  res.status(404).send('NOT FOUND!');
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
