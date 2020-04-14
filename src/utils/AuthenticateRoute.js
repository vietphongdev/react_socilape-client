import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticateRoute = ({ component : Component, authenticated, ...rest }) => {    
    return (
        <Route
            {...rest}
            render={props => authenticated ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.userReducer.authenticated
    }
  };

export default connect(mapStateToProps)(AuthenticateRoute);