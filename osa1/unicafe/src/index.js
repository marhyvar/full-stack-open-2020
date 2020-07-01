import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
<p>{text} {value}</p>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((good - bad)/all).toFixed(1)
  const positive = ((good / all) * 100).toFixed(1) + ' %'

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text='Good' value={good}/> 
      <StatisticLine text='Neutral' value={neutral}/>
      <StatisticLine text='Bad' value={bad}/>
      <StatisticLine text='All' value={all}/>
      <StatisticLine text='Average' value={average}/>
      <StatisticLine text='Positive' value={positive}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good +1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad +1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='Good'/> 
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
