const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const models = require('./models');

const { Todo } = models;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();

  res.json({ todos });
});

app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      isCompleted: false,
    });

    const data = await todo.save();

    res.json({ todo: data });
  } catch (e) {
    res.status(422).json({
      message: e.errors.map(({ path, message }) => ({
        attribute: path,
        message,
      })),
    });
  }
});

app.put('/todos/:id', async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (!todo) {
    next();
  }

  todo.isCompleted = req.body.isCompleted || !todo.isCompleted;

  const data = await todo.save();

  res.json({ todo: data });
});

app.delete('/todos/:id', async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (!todo) {
    next();
  }
  await todo.destroy({ where: { id } });
  res.status(204).end();
});

// The 404 Route (ALWAYS Keep this as the last route)
app.use((req, res) => {
  res.status(404).send('NOT FOUND!');
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
