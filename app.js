const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const todoRouter = require('./features/todo/todoRouter');
const chapterRouter = require('./features/chapter/chapterRouter');
const patternRouter = require('./features/pattern/patternRouter');
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/todos', todoRouter);
app.use('/chapter', chapterRouter);
app.use('/pattern', patternRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


