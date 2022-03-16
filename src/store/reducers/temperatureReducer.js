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

const getCurrentCardInfo = (data) => {
  const timeArr = [0, 3, 6, 9, 12, 15, 18, 21]
  const nearestTime = Math.max(...timeArr.filter(v => v < new Date().getHours()))
  const nearestIndex = timeArr.indexOf(nearestTime)
  return data[0].tabContent[nearestIndex]
}

const getNowTemperature = (data) => {
  const currentCardInfo = getCurrentCardInfo(data)
  return Math.round((currentCardInfo.min + currentCardInfo.max) / 2)
}

const getNowCloudiness = (data) => {
  const currentCardInfo = getCurrentCardInfo(data)
  return currentCardInfo.cloudiness
}

const translateToCelsiusFormula = (degree) => Math.round((degree - 32) * 5 / 9)
const translateToFahrenheitFormula = (degree) => Math.round(degree * 9 / 5 + 32)

const defaultStateTemperature = {
  temperatureArr: data,
  scale: "C",
  nowTemperature: getNowTemperature(data),
  nowCloudiness: getNowCloudiness(data)
}
const TRANSLATE_TO_CELSIUS = 'TRANSLATE_TO_CELSIUS';
const TRANSLATE_TO_FAHRENHEIT = 'TRANSLATE_TO_FAHRENHEIT';


export const temperatureReducer = (state = defaultStateTemperature, action) => {
  switch (action.type) {

    case TRANSLATE_TO_CELSIUS:
      return {
        ...state,
        temperatureArr: state.temperatureArr.map(element => ({
          ...element,
          tabContent: element.tabContent.map(elem => ({
            ...elem,
            min: translateToCelsiusFormula(elem.min),
            max: translateToCelsiusFormula(elem.max)
          }))
        })),
        scale: 'C',
        nowTemperature: translateToCelsiusFormula(state.nowTemperature)
      }
    case TRANSLATE_TO_FAHRENHEIT:
      return {
        ...state,
        temperatureArr: state.temperatureArr.map(element => ({
          ...element,
          tabContent: element.tabContent.map(elem => ({
            ...elem,
            min: translateToFahrenheitFormula(elem.min),
            max: translateToFahrenheitFormula(elem.max)
          }))
        })),
        scale: 'F',
        nowTemperature: translateToFahrenheitFormula(state.nowTemperature)
      }
    default: return state
  }
}

export const translateToCelsius = (payload) => ({ type: TRANSLATE_TO_CELSIUS, payload })
export const translateToFahrenheit = (payload) => ({ type: TRANSLATE_TO_FAHRENHEIT, payload })