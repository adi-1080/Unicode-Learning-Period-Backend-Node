// MODEL-VIEW-CONTROLLER IS THE MVC ARCHITECTURE

const mongoose          = require('mongoose')
const Schema            = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    resume_url: {
        type: String
    },
    tech_stack:{
        type: [String]
    },
    field_of_interest:{
        type: String
    },
    experience_level:{
        type: String
    },
    bio:{
        type: String
    }

}, {timestamps: true}) // TIMESTAMPS ADDS TWO ATTRIBUTES TO THE DATA, CREATED_AT AND UPDATED_AT

const User = mongoose.model('User',userSchema)
module.exports = User