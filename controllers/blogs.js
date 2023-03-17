const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => { 
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) { 
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => { 
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) { 
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    if (!request.body.title  || !request.body.url ) { 
        return response.status(400).json({error: 'title or url missing'})
    }
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: request.body.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => { 
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) { 
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        await user.save()
        response.status(204).json({message: 'blog deleted'})
    }
    else { 
        return response.status(400).json({error: 'user not authorized to delete this blog'})
    }
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