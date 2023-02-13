const mongoose = require('mongoose')
const mongooseDateFormat = require('mongoose-date-format')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

taskSchema.plugin(mongooseDateFormat);

module.exports = mongoose.model('Task', taskSchema)