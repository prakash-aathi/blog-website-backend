const mongoose = require('mongoose');
const supertest = require('supertest'); // supertest is a library that allows us to make HTTP requests in our tests
const app = require('../app'); // the express app we just created
const api = supertest(app); 
const blog = require('../models/blog');

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

beforeEach(async () => {
    let blogObject = new blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new blog(initialBlogs[1])
    await blogObject.save()
 },100000)

test('blogs are returned as json', async () => { 
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
},100000)

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
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('node course')

    const addedBlog = res.body.find(r => r.title === 'node course')
    expect(addedBlog.likes).toBe(0)
}, 100000)

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

afterAll(async () => { 
    await blog.deleteMany({})
    await mongoose.connection.close()
},100000)