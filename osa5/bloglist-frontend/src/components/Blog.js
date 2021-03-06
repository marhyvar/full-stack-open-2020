import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [adder, setAdder] = useState(blog.user.name || '')

  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  const handleUpdate = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user === undefined ? undefined : blog.user.id,
      adder: adder
    }
    updateBlog(blogObject)
  }

  const handleRemove = () => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      removeBlog(blog)
    }
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

  const removeButtonStyle = {
    color: 'white',
    background: 'red',
    padding: 5,
    display: 'block'
  }

  return (
    <>
      <div style={hideWhenVisible} className='lessInfo'>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='moreInfo'>
        <div style={blogStyle2}>
          <p>{blog.title} {blog.author} <button onClick={() => setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p className='likes'>likes {blog.likes}</p><button className='like-button' onClick={handleUpdate}>like</button>

          <p>{ blog.user.name || blog.adder }</p>
          { blog.user.username === user.username || blog.adder === user.name ? <button style={removeButtonStyle} onClick=
            {handleRemove}>remove</button> : <br></br>}
        </div>
      </div>
    </>
  )}

export default Blog
