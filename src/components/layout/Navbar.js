import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
// Component
import CreateScream from '../scream/CreateScream';
// Action
import { handleLogout } from '../../redux/actions/userAction';
import { IoIosLogIn } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';

const styles = (theme) => ({
  menu: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  render() {
    const { classes, authenticated, handleLogout } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Typography className={classes.menu}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/">
              Blog
            </Button>
          </Typography>
          {authenticated ? (
            <Fragment>
              <Button
                color="inherit"
              >
                <CreateScream />
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={() => handleLogout()}
              >
                <ExitToApp />
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/signup">
                <FiLogIn size={18} />
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                <IoIosLogIn size={20} />
                Login
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.userReducer.authenticated,
  };
};

const mapActionToProps = {
  handleLogout,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Navbar));
