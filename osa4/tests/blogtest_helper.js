const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React v16.9.0 and the Roadmap Update',
    author: 'Dan Abramov and Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/08/react-v16.9.0.html',
    likes: 10
  },
  {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}