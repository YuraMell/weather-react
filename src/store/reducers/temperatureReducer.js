import { translateToCelsiusFormula, translateToFahrenheitFormula } from "../../utils/temperature";
import { getCurrentDay } from "../../utils/time"

const defaultStateTemperature = {
  scale: "C",
  apiWeather: [],
  day: new Date().toLocaleString('en-us', { weekday: 'long' })
}
export const TRANSLATE_TO_CELSIUS = 'TRANSLATE_TO_CELSIUS';
export const TRANSLATE_TO_FAHRENHEIT = 'TRANSLATE_TO_FAHRENHEIT';
export const FETCH_DATA = 'FETCH_DATA';
export const SET_ANOTHER_DAY = 'SET_ANOTHER_DAY';

export const temperatureReducer = (state = defaultStateTemperature, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        apiWeather: action.payload
      }
    case TRANSLATE_TO_CELSIUS:
      return {
        ...state,
        apiWeather: {
          ...state.apiWeather,
          current: {
            ...state.apiWeather.current,
            temp: translateToCelsiusFormula(state.apiWeather.current.temp)
          },
          daily: state.apiWeather.daily.map(day => ({
            ...day,
            temp: {
              ...day.temp,
              min: translateToCelsiusFormula(day.temp.min),
              max: translateToCelsiusFormula(day.temp.max)
            }
          })),
          hourly: state.apiWeather.hourly.map(hour => ({
            ...hour,
            temp: translateToCelsiusFormula(hour.temp),
            feels_like: translateToCelsiusFormula(hour.feels_like)
          })),
        },
        scale: 'C',
      }
    case TRANSLATE_TO_FAHRENHEIT:
      return {
        ...state,
        apiWeather: {
          ...state.apiWeather,
          current: {
            ...state.apiWeather.current,
            temp: translateToFahrenheitFormula(state.apiWeather.current.temp)
          },
          daily: state.apiWeather.daily.map(day => ({
            ...day,
            temp: {
              ...day.temp,
              min: translateToFahrenheitFormula(day.temp.min),
              max: translateToFahrenheitFormula(day.temp.max)
            }
          })),
          hourly: state.apiWeather.hourly.map(hour => ({
            ...hour,
            temp: translateToFahrenheitFormula(hour.temp),
            feels_like: translateToFahrenheitFormula(hour.feels_like)
          })),
        },
        scale: 'F',
      }
    case SET_ANOTHER_DAY:
      return {
        ...state,
        day: getCurrentDay(action.payload),
        apiWeather: {
          ...state.apiWeather,
          current: {
            ...state.apiWeather.current,
            temp: state.scale === 'C'
              ? state.apiWeather.daily[action.payload].temp.day
              : translateToFahrenheitFormula(state.apiWeather.daily[action.payload].temp.day),
            clouds: state.apiWeather.daily[action.payload].clouds,
          },
        },
      }
    default: return state
  }
}

export const translateToCelsius = (payload) => ({ type: TRANSLATE_TO_CELSIUS, payload })
export const translateToFahrenheit = (payload) => ({ type: TRANSLATE_TO_FAHRENHEIT, payload })
export const setAnotherDay = (payload) => ({ type: SET_ANOTHER_DAY, payload })