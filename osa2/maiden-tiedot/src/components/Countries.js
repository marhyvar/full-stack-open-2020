import React from 'react'
import CountryInfo from './CountryInfo'

const Country = ({country, handleButtonClick}) => {
    return (
        <div>
          <p>
              {country.name}
              <button value={country.name} onClick={handleButtonClick}>show</button>
          </p>
          
        </div>
    )
}

const Countries = ({filteredCountries, handleButtonClick}) => {
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
                    <Country
                        key={country.name}
                        country={country}
                        handleButtonClick={handleButtonClick}
                    />)}
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