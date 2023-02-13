/* eslint-disable no-unused-vars */
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoute = require('./routes/users')
const taskRoute = require('./routes/tasks')

const app = express()
app.use(cors())
// app.use(cors)

// load config
dotenv.config({ path: './config/config.env' })


connectDB()

// body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// logging
app.use(morgan('dev'))

// routes
app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)



const port = process.env.PORT || 5000
app.listen(port, console.log(`server running in port ${port}`))