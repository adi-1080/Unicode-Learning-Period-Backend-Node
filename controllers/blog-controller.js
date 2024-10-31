import Blog from "../models/blog-model.js"

const createBlog = async(req,res) => {
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

const updateBlog = async(req,res) => {
    try{
        const {blog_id} = req.params;
        const updatedData = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(blog_id, updatedData, {new: true});

        if(!updatedBlog){
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
    }
    catch(err){
        res.status(500).json({ message: 'Could not update blog', error: err});
    }
}

const deleteBlog = async(req,res) => {
    try{
        const {blog_id} = req.params

        const deletedBlog = await Blog.findByIdAndDelete({blog_id})

        if(!deletedBlog){
            return res.status(404).json({message: "Blog not found"})
        }

        res.status(200).json({message: "Blog deleted successfully", deleteBlog})
    }
    catch(err){
        res.status(500).json({message: "Could not delete blog", error: err})
    }
}

const getBlogById = async(req,res) => {
    try {
        const {blog_id} = req.params;

        const fetchedBlog = await Blog.findById(blog_id);

        if (!fetchedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({fetched_blog: fetchedBlog});
    }
    catch(err){
        res.status(500).json({ message: 'Could not fetch blog', error: err});
    }
}

const getBlogsPostedToday = async(req,res) => {
    try{
        const today = new Date()
        today.setHours(0,0,0,0)

        const blogs = await Blog.find({created_at: {$gte: today}})

        res.status(200).json({blog_posted_today: blogs})
    }
    catch(err){
        res.status(500).json({ message: 'Could not fetch blogs', error: err});
    }
}

const getBlogsPostedOnADate = async(req,res) => {
    try{
        const {date} = req.params
        const targetDate = new Date(date)
        targetDate.setHours(0,0,0,0)

        const nextDay = new Date(targetDate)
        nextDay.setHours(targetDate.getDate() + 1)

        const blogs = await Blog.find({created_at: {$gte: targetDate, $lt: nextDay}})

        res.status(200).json({blogs})
    }
    catch(err){
        res.status(500).json({ message: 'Could not fetch blogs', error: err});
    }
}

const getBlogsByTags = async(req,res) => {
    try{
        const {tags} = req.body

        const blogs = await Blog.find({tags: {$in: tags}})

        res.status(200).json({blogs})
    }
    catch(err){
        res.status(500).json({ message: 'Could not fetch blog', error: err});
    }
}

export default {
    createBlog, 
    updateBlog, 
    deleteBlog, 
    getBlogById, 
    getAllBlogs, 
    getBlogsPostedToday, 
    getBlogsPostedOnADate, 
    getBlogsByTags
}