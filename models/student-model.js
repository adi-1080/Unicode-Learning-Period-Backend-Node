// MODEL-VIEW-CONTROLLER IS THE MVC ARCHITECTURE

const mongoose          = require('mongoose')
const Schema            = mongoose.Schema

const studentSchema = new Schema({
    sapid: {
        type: String
    },
    name: {
        type: String
    },
    department: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    contact: {
        type: String
    }

}, {timestamps: true}) // TIMESTAMPS ADDS TWO ATTRIBUTES TO THE DATA, CREATED_AT AND UPDATED_AT

const Student = mongoose.model('Student',studentSchema)
module.exports = Student