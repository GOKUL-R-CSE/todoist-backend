const Task = require('../models/taskModel')
const mongoose = require('mongoose')
const moment = require('moment')

const today = moment().startOf('day')
const tomorrow = today.clone().add(1, 'days')

// get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id, completed: 'false',
        date: {
            $gte: today.toDate(),
        }
    }).sort({ date: -1 })

    res.status(200).json(tasks)
}

// get expired tasks
const getExpiredTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id, completed: 'false',
        date: {
            $lt: today.toDate(),
        }
    }).sort({ createdAt: -1 })
    res.status(200).json(tasks)
}

// get a today tasks
const getTodayTask = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id, date: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        completed: 'false'
    })

    if (!tasks) {
        return res.status(404).json({ error: 'No tasks' })
    }

    res.status(200).json(tasks)
}

// get upcoming tasks
const getTomorrowTask = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id, date: {
            $gte: tomorrow.toDate(),
            $lte: moment(tomorrow).endOf('day').toDate()
        },
        completed: false
    })

    if (!tasks) {
        return res.status(404).json({ error: 'No tasks' })
    }
    res.status(200).json(tasks)
}

// get completed tasks
const getCompletedTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({
        user_id, completed: 'true'
    })
    if (!tasks) {
        return res.status(404).jsom({ error: 'No Tasks' })
    }
    res.status(200).json(tasks)
}

// create a new task
const createTask = async (req, res) => {
    const { title, desc, date } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!desc) {
        emptyFields.push('desc')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add to the database
    try {
        const user_id = req.user._id
        const task = await Task.create({ user_id, title, desc, date })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such task' })
    }

    const task = await Task.findOneAndDelete({ _id: id })

    if (!task) {
        return res.status(400).json({ error: 'No such task' })
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such task' })
    }

    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!task) {
        return res.status(400).json({ error: 'No such task' })
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    getTodayTask,
    getTomorrowTask,
    createTask,
    deleteTask,
    updateTask,
    getCompletedTasks,
    getExpiredTasks
}