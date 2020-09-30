import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather'
import { connect } from 'react-redux';
import {getWeatherForSelectPeriod} from '../../modules/requests';

const Today = ({ history, position }) => {

  const [todayWeather, setTodayWeather] = useState([])

  useEffect(() => {
    if(!!Object.keys(position).length) {
      getWeatherForSelectPeriod(position.lat, position.lon).then((resp) => {
        const today = [resp.hourly[1], resp.hourly[2], resp.hourly[3]]
        setTodayWeather(today)
      })
    }
  }, [position])

  return (
    <div className={'todayMain'}>
      <Header history={history} />
      <CurrentWeather showDescriptionWeather={false} />
      <DailyWeather header={'Today'} weather={todayWeather} location={position}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Today);