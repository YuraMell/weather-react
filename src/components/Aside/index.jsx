import React from 'react'
import Searchbar from '../Searchbar'
import './index.css'
import WeatherCityInfo from '../WeatherCityInfo'

const info = {
  temperature: 9,
  scale: 'C',
  city: 'Kyiv',
  country: 'UA',
  cloudiness: 75,
}

const Aside = () => {
  return (
    <div className='aside'>
      <Searchbar />
      <WeatherCityInfo info={info} />
    </div>
  )
}

export default Aside