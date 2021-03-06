import React from 'react'
import { useSelector } from 'react-redux'
import CardInfo from '../CardInfo'
import Map from '../Map'
import Tabs from '../Tabs'
import './index.css'
import sunsetImg from '../../img/arrow-down.png'
import sunriseImg from '../../img/arrow-up.png'
import hotTemperature from '../../img/hot_temperature.png'
import coldTemperature from '../../img/low_temperature.png'
import { getTime } from '../../utils/time'

const Content = () => {
  const apiWeather = useSelector(state => state.temperatureReducer.apiWeather)
  const daily = apiWeather?.daily
  const hourly = apiWeather?.hourly
  const uvIndex = Math.round(daily && daily[0].uvi)
  const windSpeed = daily && daily[0].wind_speed
  const sunset = daily && daily[0].sunset
  const sunrise = daily && daily[0].sunrise
  const humidity = daily && daily[0].humidity
  const visibility = hourly && hourly[0].visibility
  const min = daily && Math.floor(daily[0].temp.min)
  const max = daily && Math.floor(daily[0].temp.max)
  const lat = apiWeather?.lat
  const lon = apiWeather?.lon

  return (
    <main>
      <Tabs />
      <h3>Today's Highlights</h3>
      <div className="grid-info">
        <div className="grid-cards-info">
          <CardInfo name="UV index">
            <div className="progressbar-container">
              <div
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="15"
                style={{ "--value": uvIndex / 15 * 50 }}
              >
                <span>{uvIndex}</span>
              </div>
            </div>
          </CardInfo>
          <CardInfo name="Wind Status">
            <div className='indicator'>
              <span>{windSpeed}</span> km/h
            </div>
            <p className="description">{windSpeed > 2 ? 'Strong wind' : 'Light breeze'}</p>
          </CardInfo>
          <CardInfo name="Sunrise &#38; Sunset">
            <div className="sun-status">
              <img
                src={sunriseImg}
                alt="sunrise"
                className='sun-status-img'
              />
              <span>{getTime(sunrise)}</span>
            </div>
            <div className="sun-status">
              <img
                src={sunsetImg}
                alt="sunset"
                className='sun-status-img'
              />
              <span>{getTime(sunset)}</span>
            </div>
          </CardInfo>
          <CardInfo name="Humidity">
            <div className='indicator'>
              <span>{humidity}</span>%
            </div>
            <progress
              value={humidity}
              max='100'
              min='0'
              className='humidity-progress'
            />
            <p className="description">{humidity > 80 ? 'Miserable' : 'Optimal'}</p>
          </CardInfo>
          <CardInfo name="Visibility">
            <div className='indicator'>
              <span>{visibility / 1000}</span> km/h
            </div>
            <p className="description">{visibility >= 10000 ? 'Good visibility' : 'Bad visibility'}</p>
          </CardInfo>
          <CardInfo name="Min &#38; Max Temperature">
            <div className="sun-status">
              <img
                src={hotTemperature}
                alt="sunrise"
                className='sun-status-img'
              />
              <span>{Math.floor(max)}&deg;</span>
            </div>
            <div className="sun-status">
              <img
                src={coldTemperature}
                alt="sunset"
                className='sun-status-img'
              />
              <span>{Math.floor(min)}&deg;</span>
            </div>
          </CardInfo>
        </div>
        <Map lat={lat} lon={lon} />
      </div>
    </main>
  )
}

export default Content