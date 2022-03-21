import React from 'react'
import Searchbar from '../Searchbar'
import './index.css'
import WeatherCityInfo from '../WeatherCityInfo'

function open() {
  document.querySelector(".aside").classList.toggle("show");
}

const Aside = () => {
  return (
    <>
      <span id="trigger" className="trigger" onClick={open}>
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