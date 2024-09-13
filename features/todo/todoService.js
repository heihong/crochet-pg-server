const connectionPool = require('../../database');
const format = require('pg-format');
class TodoService {

    onSeletAllTodo() {
        return new Promise((resolve, reject) => {
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('SELECT * FROM todos ORDER BY id ASC'); // get inputs from req
                db.query(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result.rows);
                })
            });
        });
    };

    onSeletedTodoByLimit (req) {
        const { limit } = req.body
      
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('SELECT * FROM todos LIMIT $1'); // get inputs from req
                db.query(query, [limit],(err, result) => {
                    if (err) reject(err);
                    resolve(result.rows);
                })
            });
        });
    };

    onCreateTodo (req) {
        const { action, nbstitch} = req.body;
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('INSERT INTO todos (action, nbstitch) VALUES ($1, $2) RETURNING *'); // get inputs from req
                db.query(query, [action, nbstitch],(err, result) => {
                    if (err) reject(err);
                    resolve(result.rows[0].id);
                })
            });
        });
    }

    onUpdateTodo (req) {
        const id = parseInt(req.params.id);
        const { action, nbstitch } = req.body;
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('UPDATE todos SET action = $1, nbstitch = $2 WHERE id = $3'); // get inputs from req
                db.query(query, [action, nbstitch, id],(err, result) => {
                    if (err) reject(err);
                    resolve(id);
                })
            });
        });
    };

    onDeleteTodo (req) {
        const id = parseInt(req.params.id)
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('DELETE FROM todos WHERE id = $1'); // get inputs from req
                db.query(query, [id],(err, result) => {
                    if (err) reject(err);
                    resolve(id);
                })
            });
        });
    };

    onFindTodo (req) {
        const {action, nbstitch} = req.body
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format(`SELECT * FROM todos WHERE action LIKE '%'||$1||'%'`); // get inputs from req
                db.query(query, [action],(err, result) => {
                    if (err) reject(err);
                    resolve(result.rows);
                })
            });
        });
    };
      
}

module.exports = TodoService;