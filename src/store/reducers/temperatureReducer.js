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

const defaultStateTemperature = {
  temperatureArr: data,
  scale: "C",
  apiWeather: []
}
const TRANSLATE_TO_CELSIUS = 'TRANSLATE_TO_CELSIUS';
const TRANSLATE_TO_FAHRENHEIT = 'TRANSLATE_TO_FAHRENHEIT';
const FETCH_DATA = 'FETCH_DATA';


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
          main: {
            ...state.apiWeather.main,
            temp_min: translateToCelsiusFormula(state.apiWeather.main.temp_min),
            temp_max: translateToCelsiusFormula(state.apiWeather.main.temp_max),
            temp: translateToCelsiusFormula(state.apiWeather.main.temp)
          }
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
            temp_max: translateToFahrenheitFormula(state.apiWeather.main.temp_max),
            temp: translateToFahrenheitFormula(state.apiWeather.main.temp)
          }
        },
        scale: 'F',
      }
    default: return state
  }
}

export const translateToCelsius = (payload) => ({ type: TRANSLATE_TO_CELSIUS, payload })
export const translateToFahrenheit = (payload) => ({ type: TRANSLATE_TO_FAHRENHEIT, payload })

export const fetchData = (city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f5a07e3e731fc9685bc29c7880cddf65`)
      // const ttt = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=metric&exclude=minutely&appid=f5a07e3e731fc9685bc29c7880cddf65`)
      response && dispatch({ type: FETCH_DATA, payload: response.data })
    } catch (e) {
      console.log(e)
    }
  }
}