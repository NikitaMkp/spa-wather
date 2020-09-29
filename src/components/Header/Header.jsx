import React, { useState } from 'react';
import './Header.scss';
import { Button, AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import { setWeather, setPosition } from '../../actions';
import { connect } from 'react-redux';
import { fetchCity, fetchWeather } from '../../modules/requests';

const Header = ({ saveWeather, history, savePosition }) => {

  let timerId = 1;

  const [cities, setCities] = useState([]);

  const handleSearch = (value) => {
    clearTimeout(timerId);
    if (value !== '') {
      timerId = setTimeout(() => {
        fetchCity(value).then(resp => {
          setCities(resp.list);
        });
      }, 300);
    }
  };

  const renderItem = (cityName, id, country, coord) => {
    return {
      value: `${cityName}, ${country}`,
      key: id,
      payload: coord,
    };
  };

  const getOptions = () => {
    let newOptions = [];
    cities.forEach((city) => {
      return newOptions.push(renderItem(city.name, city.id, city.sys.country, Object.values(city.coord)));
    });
    return newOptions;
  };

  const selectCity = (value, options) => {
    fetchWeather(options.payload[0], options.payload[1]).then(resp => {
      saveWeather(resp);
      savePosition(options.payload[0], options.payload[1])
    });
  };

  return (
    <div className={'main'}>
      <div>
        <Button type="text" size={'large'} style={{ color: '#c6c8c9' }} onClick={() => history.push('/today')}>Today</Button>
        <Button type="text" size={'large'} style={{ color: '#c6c8c9' }} onClick={() => history.push('/tomorrow')}>Tomorrow</Button>
        <Button type="text" size={'large'} style={{ color: '#c6c8c9' }} onClick={() => history.push('/week')}>Week</Button>
      </div>
      <div className={'searchPanel'}>
        <AutoComplete
          placeholder={'Find city...'}
          style={{ width: '100%' }}
          onSearch={handleSearch}
          options={getOptions()}
          onSelect={selectCity}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveWeather: data => {
      dispatch(setWeather(data));
    },
    savePosition: (lat, lon) => {
      dispatch(setPosition(lat, lon))
    }
  };
};

function mapStateToProps(state) {
  return {
    weather: state.weather,
    state: state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);