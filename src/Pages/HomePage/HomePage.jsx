import React from 'react';
import Header from "../../components/Header/Header";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather"
import Cities from "../../components/Cities/Cities";



const HomePage = ({ history }) => {
  return (
    <div className="App">
      <Header history={history} />
      <CurrentWeather/>
      <Cities history={history} />
    </div>
  );
}

export default HomePage;
