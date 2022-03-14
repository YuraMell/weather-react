export const data = [
  {
    id: 1,
    tabTitle: "Today",
    tabContent: [
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
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
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
    ]
  },
]

const defaultStateTemperature = {
  temperatureArr: data
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
            min: elem.min / 2,
            max: elem.max / 2
          }))
        }))
      }
    case TRANSLATE_TO_FAHRENHEIT:
      return {
        ...state,
        temperatureArr: state.temperatureArr.map(element => ({
          ...element,
          tabContent: element.tabContent.map(elem => ({
            ...elem,
            min: elem.min * 2,
            max: elem.max * 2
          }))
        }))
      }
    default: return state
  }
}

export const translateToCelsius = (payload) => ({ type: TRANSLATE_TO_CELSIUS, payload })
export const translateToFahrenheit = (payload) => ({ type: TRANSLATE_TO_FAHRENHEIT, payload })