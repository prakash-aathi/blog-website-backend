const mongoose = require('mongoose');
const supertest = require('supertest'); // supertest is a library that allows us to make HTTP requests in our tests
const app = require('../app'); // the express app we just created
const api = supertest(app); 
const blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await blog.deleteMany({})
    await blog.insertMany(helper.initialBlogs)
 },100000)

describe('when there is initially some blogs saved', () => { 
    test('blogs are returned as json', async () => { 
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('all blogs are returned', async () => { 
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('addition of a new  blog', () => { 
    test('creating a blog without title and url fails', async () => { 
        const newBlog = {
            url: "https://majot.com",
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    },100000)    
})

describe("deletion of a blog", () => { 
    test('succeeds with status code 204 if id is valid', async () => { 
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    }, 100000)
    
    test(' a valid blog can be added with default likes ', async () => { 
        const newBlog = {
            title: "node course",
            author: "sushmi",
            url: "https://sushmi.com",
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const res = await api.get('/api/blogs')
        const titles = res.body.map(r => r.title)
        expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('node course')
    
        const addedBlog = res.body.find(r => r.title === 'node course')
        expect(addedBlog.likes).toBe(0)
    }, 100000)

    
})



afterAll(async () => { 
    await mongoose.connection.close()
},100000)