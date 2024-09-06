const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const pattern = require('./patternController')
const chapter = require('./chapterController')
const todo = require('./todoController')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/findPattern', pattern.findPattern);

app.get('/pattern', pattern.getAllPattern);
app.post('/pattern', pattern.createPattern);
app.put('/pattern/:id', pattern.updatePattern)
app.delete('/pattern/:id', pattern.deletePattern)

app.get('/chapter', chapter.getAllChapter);
app.post('/chapter', chapter.createChapter);
app.put('/chapter/:id', chapter.updateChapter)
app.delete('/chapter/:id', chapter.deleteChapter)

app.get('/todos', todo.getAllTodo);
app.post('/todosByLimit', todo.getTodoByLimit);
app.post('/todos', todo.createTodo);
app.put('/todos/:id', todo.updateTodo)
app.delete('/todos/:id', todo.deleteTodo)
app.post('/findTodos', todo.findTodo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})