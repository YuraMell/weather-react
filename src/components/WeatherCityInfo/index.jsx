import React from 'react'
import { useSelector } from 'react-redux'
import { isBrokenClouds } from '../../utils/temperature'
import { current } from '../../utils/time'
import bigCloud from './../../img/big_cloud.jpg'
import bigSun from './../../img/big_sun.jpg'
import './index.css'


const WeatherCityInfo = () => {
  const scale = useSelector(state => state.temperatureReducer.scale)
  const apiWeather2 = useSelector(state => state.temperatureReducer.apiWeather2)
  const day = useSelector(state => state.temperatureReducer.day)
  const temperature = Math.floor(apiWeather2?.current?.temp ?? 0)
  const cloudiness = apiWeather2?.current?.clouds ?? 0
  const place = apiWeather2?.timezone?.split('/')[0]
  const city = apiWeather2?.timezone?.split('/')[1]

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
      <strong className='sity-and-country'>{city}, {place}</strong>
      <div className="day">{day}, <span>{current}</span></div>
      <hr />
      <div className="cloudiness">
        <img
          src={bigCloud}
          alt="cloud"
        />
        <span>Clouds - {cloudiness}%</span>
      </div>
      <div className="is-broken-cloud">
        <span className={isBrokenClouds(cloudiness) ? 'active' : ''}></span> Broken clouds
      </div>
    </>
  )
}

export default WeatherCityInfo