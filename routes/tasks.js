const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getTasks,
    getTodayTask,
    createTask,
    deleteTask,
    updateTask,
    getTomorrowTask,
    getCompletedTasks,
    getExpiredTasks
} = require('../controllers/taskController')

const router = express.Router()

router.use(requireAuth)

// GET all task
router.get('/', getTasks)

// GET today task
router.get('/today/', getTodayTask)

// GET tomorrow task
router.get('/tomorrow/', getTomorrowTask)

// GET completed tasks
router.get('/completed', getCompletedTasks)

// GET expired tasks
router.get('/expired', getExpiredTasks)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// UPDATE a task
router.patch('/:id', updateTask)

module.exports = router