// lähteenä käytetty https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setNewSearch ] = useState('')
  const [ found, setFound] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Persons', response.data)
        setPersons(response.data)
        setFound(response.data)
      })
  }, [])

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
      const newArray = persons.concat(personObject)
      setPersons(newArray)
      setFound(newArray)
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
      <Filter 
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons found={found} />
    </div>
  )

}

export default App