import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyWithTime } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    console.log('vote', id)
    const anecdoteToChange = props.anecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdoteToChange)
    props.notifyWithTime(`you voted '${anecdoteToChange.content}'`, 5000)
  }  

  return (
      <div>
        {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return {
      anecdotes: state.anecdotes
    }
  }
  let search = state.filter
  const result = state.anecdotes.filter(({content}) =>
    content.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  return { 
    anecdotes: result
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notifyWithTime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
