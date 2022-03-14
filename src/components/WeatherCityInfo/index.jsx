import React from 'react'
import { useSelector } from 'react-redux'
import bigCloud from './../../img/big_cloud.jpg'
import bigSun from './../../img/big_sun.jpg'
import './index.css'


const WeatherCityInfo = ({ info }) => {
  const { city, country } = info
  const temperature = useSelector(state => state.temperature.nowTemperature)
  const cloudiness = useSelector(state => state.temperature.nowCloudiness)
  const scale = useSelector(state => state.temperature.scale)

  const now = new Date();
  const today = now.toLocaleString('en-us', { weekday: 'long' })
  const current = now.getHours() + ':' + now.getMinutes();

  const isBrokenClouds = cloudiness > 50 && cloudiness < 80

  return (
    <>
      <img
        src={cloudiness < 50 ? bigSun : bigCloud}
        alt="big weather icon"
        className='big-weather-icon'
      />
      <div className='temperature-index'>
        <strong>{temperature}</strong>&deg;{scale}
      </div>
      <strong className='sity-and-country'>{city}, {country}</strong>
      <div className="day">{today}, <span>{current}</span></div>
      <hr />
      <div className="cloudiness">
        <img
          src={bigCloud}
          alt="cloud"
        />
        <span>Clouds - {cloudiness}%</span>
      </div>
      <div className="is-broken-cloud">
        <span className={isBrokenClouds ? 'active' : ''}></span> Broken clouds
      </div>
    </>
  )
}

export default WeatherCityInfo