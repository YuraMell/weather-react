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
        cloudiness: 90
      },
      {
        min: 20,
        max: 8,
        cloudiness: 55
      },
      {
        min: 5,
        max: 8,
        cloudly: 45
      },
      {
        min: 5,
        max: 8,
        cloudiness: 20
      },
      {
        min: 20,
        max: 8,
        cloudiness: 30
      },
      {
        min: 5,
        max: 8,
        cloudiness: 60
      },
      {
        min: 5,
        max: 8,
        cloudiness: 50
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