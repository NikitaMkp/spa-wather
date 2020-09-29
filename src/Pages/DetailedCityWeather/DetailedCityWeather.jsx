import React, { useEffect, useState } from 'react';
import { fetchWeatherByName } from '../../modules/requests';
import { Button } from 'antd';
import './DetailedCityWeather.scss'

export default function DetailedCityWeather({ history, match }) {

  const [weather, setWeather] = useState({})
  const { cityname } = match.params;

  useEffect(() => {
    fetchWeatherByName(cityname).then(resp => {
      setWeather({ ...resp });
    })

  }, [])

  return (
    <div className={'detailedWeatherMain'}>
      <div className={'content'}>
        {!!Object.keys(weather).length &&
        <div>
          <h1>{cityname}</h1>
          <p className={'currentTime'}>{new Date(weather.dt * 1000).toTimeString()}</p>
          <p className={'weatherInfo'}>{`Weather: ${weather.weather[0].description}`}</p>
          <p className={'weatherInfo'}>{`Sky: ${weather.weather[0].main}`}</p>
          <p className={'weatherInfo'}>{`Temperature: ${weather.main.temp} °C`}</p>
          <p className={'weatherInfo'}>{`Feels like: ${weather.main.feels_like} °C`}</p>
          <p className={'weatherInfo'}>{`Pressure: ${weather.main.pressure} mm Hg`}</p>
          <p className={'weatherInfo'}>{`Humidity: ${weather.main.humidity}%`}</p>
          <p className={'weatherInfo'}>{`Wind: ${weather.wind.speed} m/s`}</p>
        </div>
        }
      </div>
    </div>
  );
}