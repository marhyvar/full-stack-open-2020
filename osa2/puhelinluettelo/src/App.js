// lähteenä käytetty https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

import React, { useState } from 'react'

const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setNewSearch ] = useState('')
  const [ found, setFound] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(({name}) => 
      name === newName)) {
        alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const input = event.target.value
    setNewSearch(input)
    const result = persons.filter(({name}) =>
      name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
    setFound(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter shown with: <input 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {found.map(person =>
            <Person key={person.name} person={person} />
          )}
        </div>
    </div>
  )

}

export default App
