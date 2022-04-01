import { translateToCelsiusFormula, translateToFahrenheitFormula } from "../../utils/temperature";
import { getCurrentDay } from "../../utils/time"

const defaultStateTemperature = {
  scale: "C",
  apiWeather: [],
  apiWeather2: [],
  day: new Date().toLocaleString('en-us', { weekday: 'long' })
}
export const TRANSLATE_TO_CELSIUS = 'TRANSLATE_TO_CELSIUS';
export const TRANSLATE_TO_FAHRENHEIT = 'TRANSLATE_TO_FAHRENHEIT';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA2 = 'FETCH_DATA2';
export const SET_ANOTHER_DAY = 'SET_ANOTHER_DAY';

export const temperatureReducer = (state = defaultStateTemperature, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        apiWeather: action.payload
      }
    case FETCH_DATA2:
      return {
        ...state,
        apiWeather2: action.payload
      }
    case TRANSLATE_TO_CELSIUS:
      return {
        ...state,
        apiWeather2: {
          ...state.apiWeather2,
          current: {
            ...state.apiWeather2.current,
            temp: translateToCelsiusFormula(state.apiWeather2.current.temp)
          },
          daily: state.apiWeather2.daily.map(day => ({
            ...day,
            temp: {
              ...day.temp,
              min: translateToCelsiusFormula(day.temp.min),
              max: translateToCelsiusFormula(day.temp.max)
            }
          })),
          hourly: state.apiWeather2.hourly.map(hour => ({
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
        apiWeather2: {
          ...state.apiWeather2,
          current: {
            ...state.apiWeather2.current,
            temp: translateToFahrenheitFormula(state.apiWeather2.current.temp)
          },
          daily: state.apiWeather2.daily.map(day => ({
            ...day,
            temp: {
              ...day.temp,
              min: translateToFahrenheitFormula(day.temp.min),
              max: translateToFahrenheitFormula(day.temp.max)
            }
          })),
          hourly: state.apiWeather2.hourly.map(hour => ({
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
        apiWeather2: {
          ...state.apiWeather2,
          current: {
            ...state.apiWeather2.current,
            temp: state.scale === 'C'
              ? state.apiWeather2.daily[action.payload].temp.day
              : translateToFahrenheitFormula(state.apiWeather2.daily[action.payload].temp.day),
            clouds: state.apiWeather2.daily[action.payload].clouds,
          },
        },
      }
    default: return state
  }
}

export const translateToCelsius = (payload) => ({ type: TRANSLATE_TO_CELSIUS, payload })
export const translateToFahrenheit = (payload) => ({ type: TRANSLATE_TO_FAHRENHEIT, payload })
export const setAnotherDay = (payload) => ({ type: SET_ANOTHER_DAY, payload })