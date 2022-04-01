import axios from "axios"
import { FETCH_DATA, FETCH_DATA2 } from "../store/reducers/temperatureReducer"

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