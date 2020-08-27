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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}