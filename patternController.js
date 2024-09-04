const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'patterns',
  password: 'password',
  port: 5432,
})

const selectAllPattern = () =>{
  return new Promise((resolve, reject)=>{
      pool.query('SELECT * FROM pattern ORDER BY id ASC',  (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results.rows[0]);
      });
  });
};

const seletAllChapter = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM chapter ORDER BY id ASC',  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.rows);
      });
  });
}


const seletAllTodo = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM todos ORDER BY id ASC',  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.rows);
      });
  });
}


const getPattern = (request, response) => {
  Promise.all([selectAllPattern(), seletAllChapter(), seletAllTodo()]).then((values) => {
    let result = null;
    let patternPromise = values[0];
    let chapterPromise = values[1];
    let todosPromise = values[2];

    let chapter = [];
    for(let i =0; i< patternPromise.chapter.length; i++){
      let todo = [];
      for(let j =0; j< chapterPromise[i].todos.length; j++){
        todo.push(todosPromise.find((data)=> data.id === chapterPromise[i].todos[j]))
      };
      chapter.push({title: chapterPromise.find((data)=> data.id === patternPromise.chapter[i]).title,
        todos: todo
      })
     
    };

    result = {
      title: patternPromise.title,
      chapter,
    }

    response.status(200).json(result)
  });
}

const getAllTodo = (request, response) => {
  seletAllTodo().then(data =>{
  response.status(200).json(data)
 })
}

const createTodo = (request, response) => {
  const { action, number } = request.body

  pool.query('INSERT INTO todos (action, number) VALUES ($1, $2)', [action, number],  (error, results)=>{
    if (error) {
      throw error
    }
    response.status(201).send(`Todo added with ID: ${results.insertId}`)
  });
}


const updateTodo = (request, response) => {
  const id = parseInt(request.params.id)
  const { action, number } = request.body

  pool.query(
    'UPDATE todos SET action = $1, number = $2 WHERE id = $3',
    [action, number, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Todo modified with ID: ${id}`)
    }
  )
}

const deleteTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
    getPattern,
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}