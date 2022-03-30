import React from 'react'
import './index.css'
import bigCloud from './../../img/big_cloud.jpg'
import bigSun from './../../img/big_sun.jpg'

const CardWeather = ({ min, max, cloudiness, period, onClickFunc }) => {

  return (
    <div className='card-weather' onClick={onClickFunc}>
      {period}
      <img src={cloudiness < 50 ? bigSun : bigCloud} alt="" />
      <span><strong>{min}&deg;</strong> {max}&deg;</span>
    </div>
  )
}

export default CardWeather