import React, {useState, useEffect} from 'react'

import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'


const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ weather, setWeather ] = useState(null)
 
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filterCountries = (input) => (
    countries.filter(({name}) =>
      name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
  )

  const handleSearchChange = (event) => {
    const input = event.target.value
    setSearch(input)
    setFilteredCountries(filterCountries(input))
  }

  const handleButtonClick = (event) => {
    const countryName = event.target.value
    setFilteredCountries(filterCountries(countryName))
  }

  return (
    <div>
      <Filter
        search={search} 
        handleSearchChange={handleSearchChange}
      />
      {(filteredCountries.length === 1) ? (
        <CountryInfo
          filteredCountries={filteredCountries}
          weather={weather}
          setWeather={setWeather}
        />
      ) : (
        <Countries
        filteredCountries={filteredCountries} 
        handleButtonClick={handleButtonClick}
      />
      )}
      
    </div>
  )
}

export default App;
