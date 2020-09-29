import React, {Component} from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"

import Home from './Pages/HomePage/HomePage'
import Today from './Pages/Today/Today'
import Tomorrow from './Pages/Tomorrow/Tommorrow';
import Week from './Pages/Week/Week';
import DetailedCityWeather from './Pages/DetailedCityWeather/DetailedCityWeather';

function App ({ history }) {
    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/home' component={Home} />
          <Route history={history} path='/today' component={Today} />
          <Route history={history} path='/tomorrow' component={Tomorrow} />
          <Route history={history} path='/week' component={Week} />
          <Route history={history} path='/cities/:cityname' component={DetailedCityWeather} />
          <Redirect from='/' to='/home'/>
        </Switch>
      </div>
    );
}


export default withRouter(App)
