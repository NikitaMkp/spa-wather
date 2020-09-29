import React from 'react';
import './DailyWeather.scss';
import { Row, Col } from 'antd';
import GoogleMap from '../GoogleMap/GoogleMap';

const DailyWeather = ({ weather, ...props }) => {
  const { header } = props;
  return (
    <div className={'dailyWeatherMain'}>
      {!!weather.length &&
      <div className={'weatherBox'}>
        <h1>{header}</h1>
        <p>{new Date(weather[0].dt * 1000).toDateString()}</p>

        <div className={'hourly'}>
          <Row>
            <Col span={4} className={'rowHeader'}>Time</Col>
            <Col span={4} className={'rowHeader'}>Weather</Col>
            <Col span={4} className={'rowHeader'} />
          </Row>
          {weather.map((hourWeather) => {
            return(
              <Row className={'dataRow'} key={`${hourWeather.dt}_${hourWeather.weather[0].id}`}>
                <Col span={4}>{new Date(hourWeather.dt * 1000).toTimeString().slice(0,5)}</Col>
                <Col span={20}>{hourWeather.temp} °C, {hourWeather.weather[0].description}, - Wind - {hourWeather.wind_speed} meter per second</Col>
              </Row>
            )
          })}
        </div>
      </div>
      }
      <div className={'map'}>
        {props.location.lat && <GoogleMap location={props.location}/>}
      </div>
    </div>
  );
};

export default DailyWeather;