const { onSeletAllPattern, onSeletAllChapter, onSeletAllTodo, onCreatePattern, onUpdatePattern ,onDeletePattern, onFindPattern } = require("./services");

const findPattern = (request, response) => {
    Promise.all([onFindPattern(request), onSeletAllChapter(), onSeletAllTodo()]).then((values) => {
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
    });
}

const getAllPattern = (request, response) => {
  onSeletAllPattern().then(data =>{
  response.status(200).json(data)
 })
}


const createPattern =(request, response) => {
  onCreatePattern(request).then(insertId =>{
      response.status(201).send(`Pattern added with ID: ${insertId}`)
  })
}

const updatePattern = (request, response) => {
  onUpdatePattern(request).then(id =>{
      response.status(200).send(`Pattern modified with ID: ${id}`)
  })
}

const deletePattern = (request, response) => {
  onDeletePattern(request).then(id =>{
      response.status(200).send(`Pattern deleted with ID: ${id}`)
  })
}

module.exports = {
  findPattern,
  getAllPattern,
  createPattern,
  updatePattern,
  deletePattern
}