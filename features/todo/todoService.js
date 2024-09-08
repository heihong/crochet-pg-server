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
        const { action, number } = req.body;
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('INSERT INTO todos (action, number) VALUES ($1, $2) RETURNING *'); // get inputs from req
                db.query(query, [action, number],(err, result) => {
                    if (err) reject(err);
                    resolve(result.rows[0].id);
                })
            });
        });
    }

    onUpdateTodo (req) {
        const id = parseInt(req.params.id);
        const { action, number } = req.body;
      
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format('UPDATE todos SET action = $1, number = $2 WHERE id = $3'); // get inputs from req
                db.query(query, [action, number, id],(err, result) => {
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
        const {search} = req.body
        return new Promise((resolve, reject)=>{
            connectionPool.connect((err, db) => {
                if (err) reject(err);
                let query = format(`SELECT * FROM todos WHERE action LIKE '%'||$1||'%'`); // get inputs from req
                db.query(query, [search],(err, result) => {
                    if (err) reject(err);
                    resolve(result.rows);
                })
            });
        });
    };
      
}

module.exports = TodoService;