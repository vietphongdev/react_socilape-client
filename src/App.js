import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// Material - Ui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import generalStyle from './styles/GeneralStyle';

import { Provider } from 'react-redux';
import store from './redux/store';

import jwtDecode from 'jwt-decode';
import AuthenticateRoute from './routes/AuthenticateRoute';
import PrivateRoute from './routes/PrivateRoute';
// Page
import Navbar from './components/layout/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

import { AUTHENTICATE_SUCCESS } from './redux/types';
import { getOwner, handleLogout } from './redux/actions/userAction';

const theme = createMuiTheme(generalStyle);

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
        store.dispatch(getOwner());
      }
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
                <Route exact path="/" component={Home} />
                <Route exact path={'/user/:userId'} component={UserDetail}/>
                <PrivateRoute exact path={'/post/create'} component={CreatePost}/>
                <PrivateRoute exact path={'/:category/:postId'} component={PostDetail}/>
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
