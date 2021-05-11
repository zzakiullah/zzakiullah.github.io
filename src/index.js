import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';

import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
