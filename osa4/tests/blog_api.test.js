const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blogtest_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there are initial blogs saved', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()

    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)

    const newBlog = new Blog({
      title: 'Example Title',
      author: 'Brian Vaughn',
      url: 'https://example.html',
      likes: 1,
      user: user._id
    })
    await newBlog.save()
  })

  describe('when retrieving blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('the field identifying the blogs is called id', async () => {
      const response = await api.get('/api/blogs')
      response.body.map(r => {
        expect(r.id).toBeDefined()
      })
    })
  })
  describe('when adding a new blog', () => {
    test('blogs can be added', async () => {
      const newBlog = {
        title: 'React v16.8: The One With Hooks',
        author: 'Dan Abramov',
        url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html',
        likes: 10,
      }

      const token = await loginUser()

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterAdding = await helper.blogsInDb()
      expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 2)
      const titles = blogsAfterAdding.map(b => b.title)
      expect(titles).toContain(
        'React v16.8: The One With Hooks'
      )
    })

    test('if the likes of a blog has no value it is set to zero', async () => {
      const newBlog = {
        title: 'React v16.8: The One With Hooks',
        author: 'Dan Abramov',
        url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html'
      }

      const token = await loginUser()

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

      const blogsAfterAdding = await helper.blogsInDb()
      const likes = blogsAfterAdding[helper.initialBlogs.length + 1].likes
      expect(likes).toBe(0)
    })

    test('blog without title and url cannot be added to list', async () => {
      const newBlog = {
        author: 'Dan Abramov'
      }

      const token = await loginUser()

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAfterAdding = await helper.blogsInDb()
      expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('blog cannot be added without authorization', async () => {
      const newBlog = {
        title: 'React v16.8: The One With Hooks',
        author: 'Dan Abramov',
        url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAfterAdding = await helper.blogsInDb()
      expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1)
    })
  })

  describe('when deleting a blog', () => {
    test('blog with valid id can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[2]
      console.log('id:', blogToDelete.id)

      const token = await loginUser()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogsAfterDelete = await helper.blogsInDb()
      expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length)

      const titles = blogsAfterDelete.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('when updating a blog', () => {
    test('blog with valid id can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const update = {
        title: 'React v16.9.0 and the Roadmap Update',
        author: 'Dan Abramov and Brian Vaughn',
        url: 'https://reactjs.org/blog/2019/08/08/react-v16.9.0.html',
        likes: 40
      }
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(update)

      const blogsAfterUpdate = await helper.blogsInDb()
      const likes = blogsAfterUpdate.map(b => b.likes)
      expect(likes[0]).toBe(40)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

const loginUser = async () => {
  const response = await api
    .post('/api/login')
    .send({
      username: 'admin',
      password: 'password'
    })
  const TOKEN = response.body.token
  return TOKEN
}
