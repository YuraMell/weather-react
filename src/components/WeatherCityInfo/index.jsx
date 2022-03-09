import React from 'react'
import bigCloud from './../../img/big_cloud.jpg'
import bigSun from './../../img/big_sun.jpg'
import './index.css'


const WeatherCityInfo = ({ info }) => {
  const { temperature, scale, city, country, cloudiness } = info
  const now = new Date();
  const today = now.toLocaleString('en-us', { weekday: 'long' })
  const current = now.getHours() + ':' + now.getMinutes();
  const isBrokenClouds = cloudiness > 50 && cloudiness < 80

  return (
    <>
      <img src={temperature > 20 ? bigSun : bigCloud} alt="" className='big-weather-icon' />
      <div className='temperature-index'>
        <strong>{temperature}</strong>&deg;{scale}
      </div>
      <strong className='sity-and-country'>{city}, {country}</strong>
      <div className="day">{today}, <span>{current}</span></div>
      <hr />
      <div className="cloudiness">
        <img src={bigCloud} alt="" />
        <span>Clouds - {cloudiness}%</span>
      </div>
      <div className="is-broken-cloud">
        <span className={isBrokenClouds ? 'active' : ''}></span> Broken clouds
      </div>
    </>
  )
}

export default WeatherCityInfo