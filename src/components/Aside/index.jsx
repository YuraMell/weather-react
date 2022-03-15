import React from 'react'
import Searchbar from '../Searchbar'
import './index.css'
import WeatherCityInfo from '../WeatherCityInfo'

const info = {
  city: 'Kyiv',
  country: 'UA',
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