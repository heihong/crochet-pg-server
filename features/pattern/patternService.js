const connectionPool = require('../../database');
const format = require('pg-format');
class PatternService {

  onSeletAllPattern () {
    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
          if (err) reject(err);
          let query = format('SELECT * FROM pattern ORDER BY id ASC'); // get inputs from req
          db.query(query, (err, result) => {
              if (err) reject(err);
              resolve(result.rows);
          })
      });
    });
  };

  onCreatePattern = (request, response) => {
    const { title, chapter } = request.body
    return new Promise((resolve, reject)=>{
      connectionPool.connect((err, db) => {
          if (err) reject(err);
          let query = format('INSERT INTO pattern (title, chapter) VALUES ($1, $2) RETURNING *'); // get inputs from req
          db.query(query, [title, chapter],(err, result) => {
              if (err) reject(err);
              resolve(result.rows[0].id);
          })
      });
    });
  };

  onFindPattern = (request, response) => {
    const { title } = request.body
    return new Promise((resolve, reject)=>{
      connectionPool.connect((err, db) => {
          if (err) reject(err);
          let query = format('SELECT * FROM pattern WHERE title=$1'); // get inputs from req
          db.query(query,[title],(err, result) => {
              if (err) reject(err);
              resolve(result.rows);
          })
      });
    });
  };


  onUpdatePattern = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, chapter } = request.body
    return new Promise((resolve, reject)=>{
      connectionPool.connect((err, db) => {
          if (err) reject(err);
          let query = format('UPDATE pattern SET title = $1, chapter = $2 WHERE id = $3'); // get inputs from req
          db.query(query, [title, chapter, id],(err, result) => {
              if (err) reject(err);
              resolve(id);
          })
      });
    });
  }

  onDeletePattern = (request, response) => {
    const id = parseInt(request.params.id)
    return new Promise((resolve, reject)=>{
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        let query = format('DELETE FROM pattern WHERE id = $1'); // get inputs from req
        db.query(query, [id],(err, result) => {
            if (err) reject(err);
            resolve(id);
        })
      });
    });
  }

}


module.exports = PatternService;