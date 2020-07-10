import React, { useEffect} from 'react'
import axios from 'axios'

const Weather =  ( {weather, setWeather, capitalName} ) => {

    const name = capitalName
    const api_key = process.env.REACT_APP_API_KEY
    console.log('capital', name)
    
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${ api_key }&query=${ name }&units=m`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }, [api_key, name, setWeather ])

    console.log('weather', weather)
    
    if (weather == null) {
        return null
    } else if (weather.success === false) {
        return (
            <div>
                <p>Error getting weather info</p>
            </div>
        )
    } else {
        return (
        <div>
            <h2>Weather in { weather.location.name }</h2>
            <p> Temperature: { weather.current.temperature } degrees Celcius</p>
            <img src={ weather.current.weather_icons[0]} alt='weathericon' />
            <p>Wind: { weather.current.wind_speed } kph direction { weather.current.wind_dir}</p>
        </div>
        )
    }
}

export default Weather