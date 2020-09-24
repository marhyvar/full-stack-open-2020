import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>{ user.name } logged in</p>
      <button onClick={ handleLogout }>logout</button>
       {blogs.map(blog =>
        <Blog key={ blog.id } blog={ blog } />
      )}
    </div>
  )
}

export default App