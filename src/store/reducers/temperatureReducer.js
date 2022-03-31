import axios from "axios"

const translateToCelsiusFormula = (degree) => Math.round((degree - 32) * 5 / 9)
const translateToFahrenheitFormula = (degree) => Math.round(degree * 9 / 5 + 32)
const getCurrentDay = (index) => {
  const today = new Date().getDay()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[today + index < 7 ? (today + index) : (today - 7 + index)]
}

const defaultStateTemperature = {
  scale: "C",
  apiWeather: [],
  apiWeather2: [],
  day: new Date().toLocaleString('en-us', { weekday: 'long' })
}
const TRANSLATE_TO_CELSIUS = 'TRANSLATE_TO_CELSIUS';
const TRANSLATE_TO_FAHRENHEIT = 'TRANSLATE_TO_FAHRENHEIT';
const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA2 = 'FETCH_DATA2';
const SET_ANOTHER_DAY = 'SET_ANOTHER_DAY';


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
        apiWeather: {
          ...state.apiWeather,
          main: {
            ...state.apiWeather.main,
            temp_min: translateToCelsiusFormula(state.apiWeather.main.temp_min),
            temp_max: translateToCelsiusFormula(state.apiWeather.main.temp_max)
          }
        },
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
        apiWeather: {
          ...state.apiWeather,
          main: {
            ...state.apiWeather.main,
            temp_min: translateToFahrenheitFormula(state.apiWeather.main.temp_min),
            temp_max: translateToFahrenheitFormula(state.apiWeather.main.temp_max)
          }
        },
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

export const fetchData = (city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f5a07e3e731fc9685bc29c7880cddf65`)
      const { lon, lat } = response.data.coord
      const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=f5a07e3e731fc9685bc29c7880cddf65`)
      response && dispatch({ type: FETCH_DATA, payload: response.data })
      response2 && dispatch({ type: FETCH_DATA2, payload: response2.data })
    } catch (e) {
      console.log(e)
    }
  }
}