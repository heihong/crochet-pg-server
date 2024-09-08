const Router = require('express');
const router = Router();
const todo = require('./todoController')    

router.get('/getAllTodo', todo.getAllTodo);
router.post('/todosByLimit', todo.getTodoByLimit);
router.post('/createTodo', todo.createTodo);
router.put('/updateTodo/:id', todo.updateTodo)
router.delete('/deleteTodo/:id', todo.deleteTodo)
router.post('/findTodo', todo.findTodo)

module.exports = router;