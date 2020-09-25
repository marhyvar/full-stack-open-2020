import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username, password)
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
        message={ message } 
        error={ error }  
        />
        <LoginForm
          username={ username }
          setUsername={ setUsername }
          password={ password }
          setPassword={ setPassword }
          handleLogin={ handleLogin }
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={message} 
        error={error}  
      />
      <p>
        { user.name } logged in <button onClick={ handleLogout }>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>     
        <BlogForm
          createBlog={ addBlog }
        />
      </Togglable>
       {blogs.map(blog =>
        <Blog key={ blog.id } blog={ blog } />
      )}
    </div>
  )
}

export default App