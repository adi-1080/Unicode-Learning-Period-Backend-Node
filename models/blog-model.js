import mongoose from "mongoose"
const Schema = mongoose.Schema

const blogSchema = new Schema({
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'author_type'
    },
    author_type:{
        type:String,
        enum:['User','Company']
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    tags:{
        type:[String]
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog