import React from 'react';
import Header from "../../components/Header/Header";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather"
import Cities from "../../components/Cities/Cities";
import { fetchWeather } from '../../modules/requests';
import { setPosition, setWeather } from '../../actions';
import { connect } from 'react-redux';



const HomePage = ({ history, weather, ...props }) => {

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeather);
  }, []);

  const getWeather = (position) => {
    const { savePosition } = props;
    savePosition(position.coords.latitude, position.coords.longitude);
    fetchWeather(position.coords.latitude, position.coords.longitude).then(resp => {
      if (!!resp) {
        const { saveWeather } = props;
        saveWeather(resp);
      }
    });
  };

  return (
    <div className="App">
      <Header history={history} />
      <CurrentWeather/>
      <Cities history={history} />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    saveWeather: data => {
      dispatch(setWeather(data));
    },
    savePosition: (lat, lon) => {
      dispatch(setPosition(lat, lon));
    },
  };
};

function mapStateToProps(state) {
  return {
    weather: state.weather,
    state: state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
