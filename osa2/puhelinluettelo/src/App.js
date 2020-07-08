// lähteenä käytetty https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setNewSearch ] = useState('')
  const [ found, setFound] = useState(persons)
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFound(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(({name}) => 
    name === newName)
    if (person) {
      const id = person.id
      const personToUpdate = {...person, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with new one?`)) {
        personService
          .update(id, personToUpdate)
          .then(returnedPerson => {
            const newArray = persons.map(person => 
              person.id !== id ? person: returnedPerson)
            setPersons(newArray)
            setFound(newArray)
            setMessage(`${returnedPerson.name}'s number updated`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          const newArray = persons.concat(returnedPerson)
          setPersons(newArray)
          setFound(newArray)
          setMessage(`${returnedPerson.name} added to phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)         
        })
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

  const handleDeletePerson = (event) => {
    const result = persons.find(({name}) => name === event.target.value)
    const id = result.id
    if (window.confirm(`Delete ${result.name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          const newArray = persons.filter(person => person.id !== id)
          setPersons(newArray)
          setFound(newArray)
          setMessage(`${result.name} deleted from phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        found={found} 
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )

}

export default App
