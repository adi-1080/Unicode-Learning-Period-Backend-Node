import Blog from "../models/blog-model.js"

const create = async(req,res) => {
    try{
        const {author_id, author_type, title, content, tags} = req.body

        if((author_type !== "User") && (author_type !== "Company")){
            return res.status(400).json({message: 'Author type invalid'})
        }

        const newBlog =  new Blog({
            author_id, author_type, title, content, tags
        })

        await newBlog.save()

        res.status(201).json({message: 'Blog post created successfully', newBlog})
    }
    catch(err){
        res.status(500).json({message: 'Could not create the blog post', error: err})
    }
}

const getAllBlogs = async(req,res) => {
    try{
        const {author_id} = req.params

        const blogs = await Blog.find({author_id}).populate('author_id', 'name contact email')

        res.status(200).json({message: 'Displaying all blogs', blogs})
    }
    catch(err){
        res.status(500).json({message: 'Error fetching all blogs', error: err})
    }
}

const update = async(req,res) => {
    try{

    }
    catch(err){

    }
}

export default {create, update, getAllBlogs}