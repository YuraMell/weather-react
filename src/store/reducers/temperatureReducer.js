import axios from "axios"

export const data = [
  {
    id: 1,
    tabTitle: "Today",
    tabContent: [
      {
        min: 5,
        max: 8,
        cloudiness: 60
      },
      {
        min: 20,
        max: 8,
        cloudiness: 80
      },
      {
        min: 5,
        max: 8,
        cloudiness: 70
      },
      {
        min: 5,
        max: 8,
        cloudiness: 35
      },
      {
        min: 20,
        max: 8,
        cloudiness: 30
      },
      {
        min: 5,
        max: 8,
        cloudiness: 25
      },
      {
        min: 5,
        max: 8,
        cloudiness: 15
      },
      {
        min: 5,
        max: 8,
        cloudiness: 10
      },
    ]
  },
  {
    id: 2,
    tabTitle: "Week",
    tabContent: [
      {
        min: 5,
        max: 8,
        cloudiness: 90,
        uvIndex: 6,
        windStatus: 2,
        sunrise: '7:20',
        sunset: '16:50',
        humidity: 81,
        visibility: 10,
      },
      {
        min: 20,
        max: 8,
        cloudiness: 55,
        uvIndex: 7,
        windStatus: 3,
        sunrise: '7:18',
        sunset: '16:52',
        humidity: 68,
        visibility: 12,
      },
      {
        min: 6,
        max: 9,
        cloudly: 45,
        uvIndex: 5,
        windStatus: 2.5,
        sunrise: '7:16',
        sunset: '16:54',
        humidity: 56,
        visibility: 10,
      },
      {
        min: 4,
        max: 7,
        cloudiness: 20,
        uvIndex: 6,
        windStatus: 1,
        sunrise: '7:14',
        sunset: '16:56',
        humidity: 45,
        visibility: 7,
      },
      {
        min: 12,
        max: 17,
        cloudiness: 30,
        uvIndex: 4,
        windStatus: 4,
        sunrise: '7:12',
        sunset: '16:58',
        humidity: 53,
        visibility: 11,
      },
      {
        min: 5,
        max: 9,
        cloudiness: 60,
        uvIndex: 8,
        windStatus: 3.5,
        sunrise: '7:10',
        sunset: '17:00',
        humidity: 59,
        visibility: 8,
      },
      {
        min: 9,
        max: 14,
        cloudiness: 50,
        uvIndex: 7,
        windStatus: 3.9,
        sunrise: '7:08',
        sunset: '17:02',
        humidity: 75,
        visibility: 12,
      },
    ]
  },
]

const translateToCelsiusFormula = (degree) => Math.round((degree - 32) * 5 / 9)
const translateToFahrenheitFormula = (degree) => Math.round(degree * 9 / 5 + 32)
const getCurrentDay = (index) => {
  const today = new Date().getDay()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[today + index < 7 ? (today + index) : (today - 7 + index)]
}

const defaultStateTemperature = {
  temperatureArr: data,
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
            temp: state.apiWeather2.daily[action.payload].temp.day,
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