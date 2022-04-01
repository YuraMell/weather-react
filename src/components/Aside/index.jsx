import React, { useState } from 'react'
import Searchbar from '../Searchbar'
import './index.css'
import WeatherCityInfo from '../WeatherCityInfo'

const Aside = () => {
  const [show, setShow] = useState(false)

  const toggle = () => setShow(show => !show)

  return (
    <>
      <span id="trigger" className={show ? 'trigger active' : 'trigger'} onClick={toggle}>
        <i></i>
        <i></i>
        <i></i>
      </span>
      <div className={show ? 'aside show' : 'aside'}>
        <Searchbar />
        <WeatherCityInfo />
      </div>
    </>
  )
}

export default Aside