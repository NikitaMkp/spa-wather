import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import getStore from './store';
import { Provider } from 'react-redux';
import App from './App';


const {store, persistor} = getStore()

const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  ), document.getElementById('root'),
);