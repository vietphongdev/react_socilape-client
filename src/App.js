import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeConfig from './utils/theme';

import { Provider } from 'react-redux';
import store from './redux/store';

import jwtDecode from 'jwt-decode';
import AuthenticateRoute from './utils/AuthenticateRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import axios from 'axios';
import { AUTHENTICATE_SUCCESS } from './redux/types';
import { getUser, handleLogout } from './redux/actions/userAction';

const theme = createMuiTheme(themeConfig);

class App extends React.Component {
  
  componentDidMount() {
    const token = localStorage.token;    
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(handleLogout());
        window.location.href = '/login';
      } else {
        store.dispatch({ type: AUTHENTICATE_SUCCESS });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUser());
      }
    } else {
      //window.location.href = '/login';
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthenticateRoute
                  exact
                  path="/signup"
                  component={Signup}
                />
                <AuthenticateRoute
                  exact
                  path="/login"
                  component={Login}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
