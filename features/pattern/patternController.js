const PatternService = require("./patternService");
const ChapterService = require("../chapter/chapterService");
const TodoService = require("../todo/todoService");

const patternService = new PatternService();
const chapterService = new ChapterService();
const todoService = new TodoService();

const findPattern = (request, response) => {
    Promise.all([patternService.onFindPattern(request), chapterService.onSeletAllChapter(), todoService.onSeletAllTodo()])
      .then((values) => {
        let result = [];
        let patternPromise = values[0];
        let chapterPromise = values[1];
        let todosPromise = values[2];
        for(let k =0; k< patternPromise.length; k++){
          let chapter = [];
          for(let i =0; i< patternPromise[k].chapter.length; i++){
            let todo = [];
            for(let j =0; j< chapterPromise[i].todos.length; j++){
              todo.push(todosPromise.find((data)=> data.id === chapterPromise[i].todos[j]))
            };
            chapter.push({title: chapterPromise.find((data)=> data.id === patternPromise[k].chapter[i]).title,
              todos: todo
            })
          
          };
        
        result.push({
          title: patternPromise[k].title,
          chapter,
        })
      }
        response.status(200).json(result)
    })
    .catch((error) => { 
      response.status(400).send({ message: error.message }) 
    })
}

const getAllPattern = (request, response) => {
  patternService.onSeletAllPattern()
    .then(data =>{
      response.status(200).json(data)
    })
    .catch((error) => { 
      response.status(400).send({ message: error.message }) 
  })
}


const createPattern =(request, response) => {
  patternService.onCreatePattern(request)
    .then(insertId =>{
      response.status(201).send(`Pattern added with ID: ${insertId}`)
    })
    .catch((error) => { 
      response.status(400).send({ message: error.message }) 
  })
}

const updatePattern = (request, response) => {
  patternService.onUpdatePattern(request)
    .then(id =>{
      response.status(200).send(`Pattern modified with ID: ${id}`)
    })
    .catch((error) => { 
      response.status(400).send({ message: error.message }) 
    })
}

const deletePattern = (request, response) => {
  patternService.onDeletePattern(request)
    .then(id =>{
      response.status(200).send(`Pattern deleted with ID: ${id}`)
    })
    .catch((error) => { 
      response.status(400).send({ message: error.message }) 
    })
}

module.exports = {
  findPattern,
  getAllPattern,
  createPattern,
  updatePattern,
  deletePattern
}