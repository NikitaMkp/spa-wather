export const SET_WEATHER = 'SET_WEATHER'
export const SET_CITY = 'SET_CITY'
export const SAVE_POSITION = 'SAVE_POSITION'

export function setWeather(data) {
  return { type: SET_WEATHER, payload: data }
}

export function setCity(data) {
  return { type: SET_CITY, payload: data }
}

export function setPosition(lat,lon) {
  return{type: SAVE_POSITION, payload: {lat, lon} }
}
