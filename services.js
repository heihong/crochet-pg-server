const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'patterns',
  password: 'password',
  port: 5432,
})

const onSeletAllPattern = () =>{
  return new Promise((resolve, reject)=>{
      pool.query('SELECT * FROM pattern ORDER BY id ASC',  (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results.rows);
      });
  });
};


const onCreatePattern = (request, response) => {
  const { title, chapter } = request.body
  return new Promise((resolve, reject)=>{
    pool.query('INSERT INTO pattern (title, chapter) VALUES ($1, $2)', [title, chapter],  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.insertId);
      });
  });
}

const onUpdatePattern = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, chapter } = request.body

  return new Promise((resolve, reject)=>{
    pool.query(
      'UPDATE pattern SET title = $1, chapter = $2 WHERE id = $3',
      [title, chapter, id],
      (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}

const onDeletePattern = (request, response) => {
  const id = parseInt(request.params.id)

  return new Promise((resolve, reject)=>{
    pool.query('DELETE FROM pattern WHERE id = $1', [id], (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}

const onSeletAllChapter = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM chapter ORDER BY id ASC',  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.rows);
      });
  });
}

const onCreateChapter = (request, response) => {
  const { title, todos } = request.body
  return new Promise((resolve, reject)=>{
    pool.query('INSERT INTO chapter (title, todos) VALUES ($1, $2)', [title, todos],  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.insertId);
      });
  });
}

const onUpdateChapter = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, todos } = request.body

  return new Promise((resolve, reject)=>{
    pool.query(
      'UPDATE chapter SET title = $1, todos = $2 WHERE id = $3',
      [title, todos, id],
      (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}

const onDeleteChapter = (request, response) => {
  const id = parseInt(request.params.id)

  return new Promise((resolve, reject)=>{
    pool.query('DELETE FROM chapter WHERE id = $1', [id], (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}

const onSeletAllTodo = () =>{
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM todos ORDER BY id ASC',  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.rows);
      });
  });
}

const onCreateTodo = (request, response) => {
  const { action, number } = request.body
  return new Promise((resolve, reject)=>{
    pool.query('INSERT INTO todos (action, number) VALUES ($1, $2)', [action, number],  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results.insertId);
      });
  });
}


const onUpdateTodo = (request, response) => {
  const id = parseInt(request.params.id)
  const { action, number } = request.body

  return new Promise((resolve, reject)=>{
    pool.query(
      'UPDATE todos SET action = $1, number = $2 WHERE id = $3',
      [action, number, id],
      (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}

const onDeleteTodo = (request, response) => {
  const id = parseInt(request.params.id)

  return new Promise((resolve, reject)=>{
    pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(id);
      });
  });
}


const onfindTodo = (request, response) => {
  const {search} = request.body

  return new Promise((resolve, reject)=>{
    pool.query(`SELECT * FROM todos WHERE action LIKE '%'||$1||'%'`, [search], (error, results) => {
        if(error){
            return reject(error);
        }
        return resolve(results.rows);
      });
  });
}


module.exports = {
  onSeletAllPattern,
  onCreatePattern,
  onUpdatePattern,
  onDeletePattern,
  onSeletAllChapter,
  onCreateChapter,
  onUpdateChapter,
  onDeleteChapter,
  onSeletAllTodo,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onfindTodo
}