import React, { useState } from 'react'
import { useRouteMatch, useHistory,
  Switch, Route, Link
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ( { anecdote } ) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content_all = useField('text')
  const author_all = useField('text')
  const info_all = useField('text')
  const array = [content_all, author_all, info_all]
  // https://stackoverflow.com/questions/56155922/how-to-delete-property-from-spread-operator
  const arrayTransformed = array.map(({reset, ...rest}) => rest)
  const content = arrayTransformed[0]
  const author = arrayTransformed[1]
  const info = arrayTransformed[2]
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    
    history.push('/')
  }

  const resetFields = () => {
    content_all.reset()
    author_all.reset()
    info_all.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <input type='button' name='reset' value='reset' onClick={resetFields} />
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  const notificationStyle = {
    border: 'solid red',
    padding: 5
  }
  if (notification === null) return null
  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(a => Number(a.id) === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {setNotification(null)}, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }



  return (

      <div>
      <h1>Software anecdotes</h1>
        <Menu />
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdote={anecdote} />
          </Route>
          <Route path='/create'>
          <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Notification notification={notification} />
            <AnecdoteList anecdotes={anecdotes} />
          </Route> 
        </Switch>   
        <Footer />
      </div>

  )
}

export default App;
