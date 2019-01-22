import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import configureStore from './redux/store';

const store = configureStore();
const theme = createMuiTheme();

Number.prototype.toTwoDecimals = function () {
  return Number(this.valueOf().toFixed(2))
};

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);