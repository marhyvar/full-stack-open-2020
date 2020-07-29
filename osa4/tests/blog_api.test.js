const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React v16.9.0 and the Roadmap Update',
    author: 'Dan Abramov and Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/08/react-v16.9.0.html',
    likes: 10,
    id: '5f1d7aaece57cc31088ea5f6'
  },
  {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
    likes: 2,
    id: '5f1d771564132925f8b95eff'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})