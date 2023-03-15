const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => { 
    Blog
        .find({})
        .then(blogs => {
        response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => { 
    if (!request.body.title  || !request.body.url ) { 
        return response.status(400).json({error: 'title or url missing'})
    }
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response) => { 
    Blog
        .findByIdAndRemove(request.params.id)
        .then(result => {
        response.status(204).end()
        })
})

blogsRouter.put('/:id', (request, response) => { 
    const body = request.body
    const blog = {
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => { 
        response.json(updatedBlog.toJSON())
        })
        .catch(error => console.log(error))
})

module.exports = blogsRouter