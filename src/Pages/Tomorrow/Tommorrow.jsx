import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather'
import { connect } from 'react-redux';
import { getWeatherForSelectPeriod } from '../../modules/requests';

const Tomorrow = ({ history, position }) => {

  const [tomorrowWeather, setTomorrowWeather] = useState([])

  useEffect(() => {
    if(!!Object.keys(position).length) {
      getWeatherForSelectPeriod(position.lat, position.lon).then((resp) => {
        const tomorrow = [resp.hourly[24], resp.hourly[25], resp.hourly[26]]
        setTomorrowWeather(tomorrow)
      })
    }
  }, [position])

  return (
    <div className={'todayMain'}>
      <Header history={history} />
      <CurrentWeather showDescriptionWeather={false} />
      <DailyWeather header={'Tomorrow'} weather={tomorrowWeather} location={position}/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {}
};

function mapStateToProps(state) {
  return {
    position: state.weather.position,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomorrow);