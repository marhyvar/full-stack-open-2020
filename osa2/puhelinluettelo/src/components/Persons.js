import React from 'react'

const Person = ({person, handleDeletePerson}) => (
    <p>
      {person.name} {person.number}
      <button value={person.name} onClick={handleDeletePerson}>Delete</button>
    </p>
)

const Persons = ({found, handleDeletePerson}) => {
    return (
        <div>
          {found.map(person =>
            <Person
              key={person.name}
              person={person}
              handleDeletePerson={handleDeletePerson}
            />
          )}
        </div>
    )
}

export default Persons