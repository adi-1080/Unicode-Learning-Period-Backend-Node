// MODEL-VIEW-CONTROLLER IS THE MVC ARCHITECTURE
import mongoose from 'mongoose'
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
    },
    follower_count:{
        type: Number,
        default: 0
    },
    following_count:{
        type: Number,
        default: 0
    }

}, {timestamps: true}) // TIMESTAMPS ADDS TWO ATTRIBUTES TO THE DATA, CREATED_AT AND UPDATED_AT

const User = mongoose.model('User',userSchema)
export default User