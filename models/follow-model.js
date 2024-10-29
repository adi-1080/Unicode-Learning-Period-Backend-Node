import mongoose from 'mongoose'

const Schema = mongoose.Schema

const followSchema = new Schema({
    follower_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    following_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    following_type:{
        type: String,
        enum: ['User','Company']
    },
    followDate:{
        type: Date,
        default: Date.now
    }
})

const Follow = mongoose.model('Follow', followSchema)

export default Follow