import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { temperatureReducer } from './reducers/temperatureReducer'

const rootReducer = combineReducers({
  temperatureReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk))