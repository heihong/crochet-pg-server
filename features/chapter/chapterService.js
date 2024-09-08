const connectionPool = require('../../database');
const format = require('pg-format');
class ChapterService {

    onSeletAllChapter () {
        return new Promise((resolve, reject) => {
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('SELECT * FROM chapter ORDER BY id ASC'); // get inputs from req
                db.query(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result.rows);
                })
            });
        });
    }
  
  conCreateChapter (request, response) {
    const { title, todos } = request.body
    return new Promise((resolve, reject)=>{
        connectionPool.connect((err, db) => {
            if (err) reject(err);
            let query = format('INSERT INTO chapter (title, todos) VALUES ($1, $2) RETURNING *'); // get inputs from req
            db.query(query, [title, todos],(err, result) => {
                if (err) reject(err);
                resolve(result.rows[0].id);
            })
        });
    });
  }
  
  onUpdateChapter (request, response) {
    const id = parseInt(request.params.id)
    const { title, todos } = request.body
    return new Promise((resolve, reject)=>{
        connectionPool.connect((err, db) => {
            if (err) reject(err);
            let query = format('UPDATE chapter SET title = $1, todos = $2 WHERE id = $3'); // get inputs from req
            db.query(query, [title, todos, id],(err, result) => {
                if (err) reject(err);
                resolve(id);
            })
        });
    });
  }
  
  onDeleteChapter (request, response) {
    const id = parseInt(request.params.id)
    return new Promise((resolve, reject)=>{
        connectionPool.connect((err, db) => {
            if (err) reject(err);
            let query = format('DELETE FROM chapter WHERE id = $1'); // get inputs from req
            db.query(query, [id],(err, result) => {
                if (err) reject(err);
                resolve(id);
            })
        });
    });
  }
}

module.exports = ChapterService;