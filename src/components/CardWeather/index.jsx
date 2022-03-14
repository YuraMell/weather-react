import React from 'react'
import './index.css'
import bigCloud from './../../img/big_cloud.jpg'
import bigSun from './../../img/big_sun.jpg'

const CardWeather = ({ min, max, cloudiness, period }) => {

  return (
    <div className='card-weather'>
      {period}
      <img src={cloudiness > 50 ? bigCloud : bigSun} alt="" />
      <span><strong>{min}&deg;</strong> {max}&deg;</span>
    </div>
  )
}

export default CardWeather