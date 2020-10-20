import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <div>
      <form onSubmit={ handleLogin } id='loginForm'>
        <div>
                username
          <input
            type='text'
            value={ username }
            name='Username'
            onChange={ ({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            type='password'
            value={ password }
            name='Password'
            onChange={ ({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm