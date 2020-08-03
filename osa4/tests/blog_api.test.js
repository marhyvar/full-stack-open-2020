const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blogtest_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the field identifying the blogs is called id', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(r => {
    expect(r.id).toBeDefined()
  })
})

test('blogs can be added', async () => {
  const newBlog = {
    title: 'React v16.8: The One With Hooks',
    author: 'Dan Abramov',
    url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAdding = await helper.blogsInDb()
  expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1)
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
  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAfterAdding = await helper.blogsInDb()
  const likes = blogsAfterAdding[helper.initialBlogs.length].likes
  expect(likes).toBe(0)
})

test('blog without title and url cannot be added to list', async () => {
  const newBlog = {
    author: 'Dan Abramov'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterAdding = await helper.blogsInDb()
  expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length)
})

test('blog with valid id can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log('id:', blogToDelete.id)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()
  expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length -1)

  const titles = blogsAfterDelete.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})