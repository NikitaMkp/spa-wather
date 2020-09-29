import { SET_WEATHER, SET_CITY, SAVE_POSITION } from '../../actions';

let newState;

export function weather(state = { cities: [], position: {} }, { type, payload }) {
  switch (type) {
    case SET_WEATHER:
      newState = { ...state };
      newState.weather = payload;
      return newState;
    case SET_CITY:
      const cities = state.cities.slice();
      if (cities.findIndex(city => payload.name === city.name) >= 0) {
        return state;
      }
      cities.push(payload);
      return { ...state, cities };
    case SAVE_POSITION:
      let position = state.position
      position = payload
      return { ...state, position };
    default:
      return state;
  }
}