const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

describe('when there is initially one user at db', () => { 
    beforeEach(async () => { 
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    },100000)
    test('creation succeeds with a fresh username', async () => { 
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "sushmi",
            name: "sushmi",
            password: "sushmi"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    },100000)
})

afterAll(async () => { 
    await User.deleteMany({})
    await mongoose.connection.close()
},100000)