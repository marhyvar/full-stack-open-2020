import React from 'react'

const Person = ({person}) => (
    <p>{person.name} {person.number}</p>
)

const Persons = ({found}) => {
    return (
        <div>
          {found.map(person =>
            <Person key={person.name} person={person} />
          )}
        </div>
    )
}

export default Persons