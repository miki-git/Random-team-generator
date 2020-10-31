import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './styles/index.css';
import App from './App';
import {store} from './redux/store';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const THEME = createMuiTheme({
  palette: {
      primary: {
          main: "#00adb5"
      },
  },
  typography: {
    fontFamily: `'Baloo 2', sans-serif`
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

