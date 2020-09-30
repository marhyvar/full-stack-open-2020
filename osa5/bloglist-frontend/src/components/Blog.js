import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const hideWhenVisible = { display: showAll ? 'none' : ''}
  const showWhenVisible = { display: showAll ? '' : 'none'} 

  const handleUpdate = (event) => {
    event.preventDefault()
    const blogObject = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user === undefined ? undefined : blog.user.id
    }
    updateBlog(blogObject)
  }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    marginBottom: 2
  }

  const blogStyle2 = {
    padding: 10,
    border: 'dotted',
    marginBottom: 2,
    background: 'lightyellow'
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle2}>
          <p>{blog.title} {blog.author} <button onClick={() => setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={handleUpdate}>like</button></p>
          { blog.user === undefined ? <p>anonymous</p> : <p>{ blog.user.username}</p>}
        </div>
      </div>
    </>
  )}

export default Blog
