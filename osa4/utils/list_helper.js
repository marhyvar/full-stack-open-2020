const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  const reducer = (max, curr) => {
    let bigger = max.likes > curr.likes ? max : curr
    return {
      title: bigger.title,
      author: bigger.author,
      likes: bigger.likes
    }
  }

  return blogs.length === 0 ? 0
    : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  let count = _.countBy(blogs, blog => blog.author)
  let array = _.toPairs(count)

  const reducer = (max, curr) => {
    let bigger = max[1] > curr[1] ? max : curr
    return {
      author: bigger[0],
      blogs: bigger[1]
    }
  }
  return blogs.length === 0 ? 0
    : array.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  let authors = {}

  _.forEach(blogs, blog => {
    if (authors[blog.author] === undefined) {
      authors[blog.author] = blog.likes
    } else {
      authors[blog.author] += blog.likes
    }
  })
  let array = _.toPairs(authors)

  const reducer = (max, curr) => {
    let bigger = max[1] > curr[1] ? max : curr
    return {
      author: bigger[0],
      likes: bigger[1]
    }
  }
  return blogs.length === 0 ? 0
    : array.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}