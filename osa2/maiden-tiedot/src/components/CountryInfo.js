import React from 'react'
import Weather from './Weather'

const CountryInfo = ({filteredCountries, weather, setWeather}) => {

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
            <Weather 
                weather={weather}
                setWeather={setWeather}
                capitalName={country.capital}
            />
        </div>
    )

    return (
        <div>
            {country()}
        </div>
    )
}

export default CountryInfo