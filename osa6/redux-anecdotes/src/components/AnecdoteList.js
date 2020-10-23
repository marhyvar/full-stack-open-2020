import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if ( filter === 'ALL') {
      return anecdotes
    }
    let search = filter
    const result = anecdotes.filter(({content}) =>
      content.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    return result
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(anecdoteToChange))
    dispatch(notify(`you voted '${anecdoteToChange.content}'`))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)
  }  

  return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
      </div>
  )
}

export default AnecdoteList