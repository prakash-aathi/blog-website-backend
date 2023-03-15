const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: "react course",
        author: "prakash",
        url: "https://prakash.com",
        likes: 12
    },{
        title: "python course",
        author: "shan",
        url: "https://shan.com",
        likes: 8
    }
]

const nonExistingId = async () => { 
    const blog = new Blog({ title: 'willremovethissoon', author: 'sushmi', url: 'https://sushmi.com', likes: 0 })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => { 
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const insertMany = async (blogs) => { 
    await Blog.insertMany(blogs)
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, insertMany
}