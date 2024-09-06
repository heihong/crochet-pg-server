const { onSeletAllTodo, onCreateTodo, onUpdateTodo, onDeleteTodo, onFindTodo, onSeletedTodoByLimit } = require("./services")


const getAllTodo = (request, response) => {
    onSeletAllTodo().then(data =>{
    response.status(200).json(data)
   })
  }

const createTodo =(request, response) => {
    onCreateTodo(request).then(insertId =>{
        response.status(201).send(`Todo added with ID: ${insertId}`)
    })
}

const updateTodo = (request, response) => {
    onUpdateTodo(request).then(id =>{
        response.status(200).send(`Todo modified with ID: ${id}`)
    })
}
  
const deleteTodo = (request, response) => {
    onDeleteTodo(request).then(id =>{
        response.status(200).send(`Todo deleted with ID: ${id}`)
    })
}

  
const findTodo = (request, response) => {
    onFindTodo(request).then(data =>{
        response.status(200).json(data)
    })
}

const getTodoByLimit = (request, response) => {
    onSeletedTodoByLimit(request).then(data =>{
        response.status(200).json(data)
    })
}
  

module.exports = {
    getTodoByLimit,
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    findTodo
}