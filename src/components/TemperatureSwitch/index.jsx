import React from 'react'
import { useDispatch } from 'react-redux'
import { translateToCelsius, translateToFahrenheit } from '../../store/reducers/temperatureReducer'
import './index.css'

const TemperatureSwitch = () => {
  const dispatch = useDispatch()

  const switchScale = (e) => {
    const switchItems = document.querySelectorAll('.switch-item')
    switchItems.forEach(item => item.classList.remove('active'))
    e.target.classList.add('active')
  }

  const switchScaleCelsius = (e) => {
    switchScale(e)
    dispatch(translateToCelsius())
  }

  const switchScaleFahrenheit = (e) => {
    switchScale(e)
    dispatch(translateToFahrenheit())
  }

  return (
    <div className='temperature-switch'>
      <span className="switch-item active" onClick={(e) => switchScaleCelsius(e)}>&deg;C</span>
      <span className="switch-item" onClick={(e) => switchScaleFahrenheit(e)}>&deg;F</span>
    </div>
  )
}

export default TemperatureSwitch