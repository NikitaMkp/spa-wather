import { combineReducers } from 'redux'
import { weather } from './weather'

const spaWeatherApp = combineReducers({
  weather
})

export default spaWeatherApp