const express = require('express')
const {createTask , getTasks,getSingleTasks,updateTasks,deleteTask} = require('../Controllers/taskController');
const router = express.Router();

router.post('/',createTask)
router.get('/',getTasks)
router.get('/:id',getSingleTasks)
router.patch('/:id',updateTasks)
router.delete('/:id',deleteTask)

module.exports = router;