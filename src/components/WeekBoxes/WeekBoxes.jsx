import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './WeekBoxes.scss';
import {getWeatherForSelectPeriod} from '../../modules/requests';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]

const WeekBoxes = ({ position }) => {

  const [dailyWeather, setDailyWeather] = useState([])
  const [daysName, setDaysName] = useState([])
  const [period, setPeriod] = useState({})

  useEffect(() => {
    if(!!Object.keys(position).length) {
      getWeatherForSelectPeriod(position.lat, position.lon).then((resp) => {
        const daily = resp.daily;
        daily.pop();
        setDailyWeather([...daily])
        const arrayNamesDay = []
        daily.forEach((day, index) => {
          const dayIndex = new Date(day.dt * 1000).getDay();
          arrayNamesDay[index] = daysOfWeek[dayIndex]
        })
        setDaysName([...arrayNamesDay]);
        const start = new Date(daily[0].dt * 1000).toDateString();
        const end = new Date(daily[6].dt * 1000).toDateString();
        setPeriod({ start: start, end: end })
      })
    }
  }, [position])

  return (
    <div className={'weekBoxesMain'}>
      {!!dailyWeather.length &&
      <div className={'content'}>
        <h1>Week</h1>
        <p>{period.start} - {period.end}</p>
        <div className={'boxes'}>
          {dailyWeather.map((day, index) => {
            return (
              <div className={'daysBox'} key={`${day.dt}`}>
                <div className={'textBox'}>
                  <p>{daysName[index]}</p>
                  <p className={'degrees'}>{`${Math.round(day.temp.day)} °C`}</p>
                  <p className={'locationTxt'}>{day.weather[0].description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

function mapStateToProps(state) {
  return {
    position: state.weather.position,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekBoxes);