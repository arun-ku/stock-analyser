import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './redux/store';

const store = configureStore();

Number.prototype.toTwoDecimals = function () {
  return Number(this.valueOf().toFixed(2))
};

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
);