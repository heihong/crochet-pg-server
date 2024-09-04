const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const patternController = require('./patternController')
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

app.get('/pattern', patternController.getPattern);
app.get('/todos', patternController.getAllTodo);
app.post('/todos', patternController.createTodo);
app.put('/todos/:id', patternController.updateTodo)
app.delete('/todos/:id', patternController.deleteTodo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})