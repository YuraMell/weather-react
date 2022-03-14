import { combineReducers, createStore } from 'redux'
import { temperatureReducer } from './reducers/temperatureReducer'

const rootReducer = combineReducers({
  temperature: temperatureReducer,
})


export const store = createStore(rootReducer)