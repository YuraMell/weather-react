import React from 'react'
import { useSelector } from 'react-redux'
import CardInfo from '../CardInfo'
import Map from '../Map'
import Tabs from '../Tabs'
import './index.css'
import sunset from '../../img/arrow-down.png'
import sunrise from '../../img/arrow-up.png'
import hotTemperature from '../../img/hot_temperature.png'
import coldTemperature from '../../img/low_temperature.png'

const Content = () => {
  const data = useSelector(state => state.temperature.temperatureArr)
  const todayData = data[1].tabContent[0]

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
                style={{ "--value": todayData.uvIndex / 15 * 50 }}
              >
                <span>{todayData.uvIndex}</span>
              </div>
            </div>
          </CardInfo>
          <CardInfo name="Wind Status">
            <div className='indicator'>
              <span>{todayData.windStatus}</span> km/h
            </div>
            <p className="description">{todayData.windStatus > 2 ? 'Strong wind' : 'Light breeze'}</p>
          </CardInfo>
          <CardInfo name="Sunrise &#38; Sunset">
            <div className="sun-status">
              <img
                src={sunrise}
                alt="sunrise"
                className='sun-status-img'
              />
              <span>{todayData.sunrise}</span>
            </div>
            <div className="sun-status">
              <img
                src={sunset}
                alt="sunset"
                className='sun-status-img'
              />
              <span>{todayData.sunset}</span>
            </div>
          </CardInfo>
          <CardInfo name="Humidity">
            <div className='indicator'>
              <span>{todayData.humidity}</span>%
            </div>
            <progress
              value={todayData.humidity}
              max='100'
              min='0'
              className='humidity-progress'
            />
            <p className="description">{todayData.humidity > 80 ? 'Miserable' : 'Optimal'}</p>
          </CardInfo>
          <CardInfo name="Visibility">
            <div className='indicator'>
              <span>{todayData.visibility}</span> km/h
            </div>
            <p className="description">{todayData.visibility >= 10 ? 'Good visibility' : 'Bad visibility'}</p>
          </CardInfo>
          <CardInfo name="Min &#38; Max Temperature">
            <div className="sun-status">
              <img
                src={hotTemperature}
                alt="sunrise"
                className='sun-status-img'
              />
              <span>{todayData.max}&deg;</span>
            </div>
            <div className="sun-status">
              <img
                src={coldTemperature}
                alt="sunset"
                className='sun-status-img'
              />
              <span>{todayData.min}&deg;</span>
            </div>
          </CardInfo>
        </div>
        <Map />
      </div>
    </main>
  )
}

export default Content