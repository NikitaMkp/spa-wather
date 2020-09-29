const APIkey = 'dc70594085f82fa9b2af152704f445bb';

export const fetchCity = async (city) => {
  const response = await fetch(`https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`)
  if (response.ok) {
    return await response.json()
  } else {
    console.log("ERROR", response.status)
  }
}

export const fetchWeather = async (lat, lon) => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}&lang=en`)
  if (response.ok) {
    return await response.json()
  } else {
    console.log("ERROR", response.status)
  }
}

export const fetchWeatherByName = async (cityname) => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${APIkey}&lang=en`)
  if (response.ok) {
    return await response.json()
  } else {
    console.log("ERROR", response.status)
  }
}

export const getWeatherForSelectPeriod = async (lat, lon, part) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${part}&appid=${APIkey}`)
  if (response.ok) {
    return await response.json()
  } else {
    console.log("ERROR", response.status)
  }
}