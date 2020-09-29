import React  from 'react';
import Header from '../../components/Header/Header';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeekBoxes from '../../components/WeekBoxes/WeekBoxes';

const Week = ({ history }) => {

  return (
    <div className={'todayMain'}>
      <Header history={history} />
      <CurrentWeather showDescriptionWeather={false} />
      <WeekBoxes/>
    </div>
  );
};


export default Week;