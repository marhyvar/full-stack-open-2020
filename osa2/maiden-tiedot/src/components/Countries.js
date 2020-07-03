import React from 'react'
import CountryInfo from './CountryInfo'

const Country = ({country}) => {
    return (
        <div>
          <p>{country.name}</p>
        </div>
    )
}

const Countries = ({filteredCountries}) => {
    if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country => 
                    <Country key={country.name} country={country}/>)}
            </div>
        )
    } else {
        return (
            <div>
                <CountryInfo filteredCountries={filteredCountries}/>
            </div>
        )
    }
}

export default Countries