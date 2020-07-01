import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781
  const [votes, setVotes] = 
  useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0))
  const [topAnecdote, setTopAnecdote] = useState(0)

  // muokattu lähteestä https://www.w3schools.com/js/js_array_sort.asp
  const mostVotes = (arr) => {
    let number = arr.length
    let maxValue = -Infinity
    let anecdote = 0
    while (number--) {
      if (arr[number] > maxValue) {
        maxValue = arr[number]
        anecdote = number
      }
    } 
    setTopAnecdote(anecdote)   
  }

  const handleSelectRandom = () => {
    let number
    do {
      number = Math.floor(Math.random() * anecdotes.length)
    } while (number === selected)
    setSelected(number)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    mostVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text='vote'/>
      <Button onClick={handleSelectRandom} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[topAnecdote]}</p>
      <p>has {votes[topAnecdote]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
