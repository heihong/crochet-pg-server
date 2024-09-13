const TodoService = require("./todoService")

const todoService = new TodoService();

const getAllTodo = (request, response) => {
    todoService.onSeletAllTodo()
        .then(data =>{
            response.status(200).json(data)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })
}

const createTodo =(request, response) => {
    todoService.onCreateTodo(request)
        .then(insertId =>{
            response.status(200).send(`Todo added with ID: ${insertId}`)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })
}

const updateTodo = (request, response) => {
    todoService.onUpdateTodo(request)
        .then(id =>{
            response.status(200).send(`Todo modified with ID: ${id}`)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })
}
  
const deleteTodo = (request, response) => {
    todoService.onDeleteTodo(request)
        .then(id =>{
            response.status(200).send(`Todo deleted with ID: ${id}`)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })
}

  
const findTodo = (request, response) => {
    todoService.onFindTodo(request)
        .then(data =>{
            response.status(200).json(data)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })
}

const getTodoByLimit = (request, response) => {
    todoService.onSeletedTodoByLimit(request)
        .then(data =>{
            response.status(200).json(data)
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
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