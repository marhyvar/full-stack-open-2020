import React from 'react'

const CountryInfo = ({filteredCountries}) => {
    const languages = () => filteredCountries[0].languages.map(language =>
        <li key={language.name}>{language.name}</li>)
    const country = () => filteredCountries.map(country =>
        <div key={country.name}>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {languages()}
            </ul>
            <img src={ country.flag } alt='flag' height='100px'/> 
        </div>
    )

    return (
        <div>
            {country()}
        </div>
    )
}

export default CountryInfo