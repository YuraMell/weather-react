import React from 'react'
import Searchbar from '../Searchbar'
import './index.css'
import WeatherCityInfo from '../WeatherCityInfo'

const Aside = () => {

  const toggle = () => {
    document.querySelector(".aside").classList.toggle("show");
    document.querySelector(".trigger").classList.toggle("active");
  }

  return (
    <>
      <span id="trigger" className="trigger" onClick={toggle}>
        <i></i>
        <i></i>
        <i></i>
      </span>
      <div className='aside'>
        <Searchbar />
        <WeatherCityInfo />
      </div>
    </>
  )
}

export default Aside