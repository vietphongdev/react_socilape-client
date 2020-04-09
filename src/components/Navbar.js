import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { handleLogout } from '../redux/actions/userAction';
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
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/">Blog</Button>
                </Typography>
                {
                    authenticated
                    ?   <Button 
                            color="inherit" 
                            component={Link}
                            to="/login"
                            onClick={() => handleLogout()}
                        >
                            <ExitToApp />
                            Logout
                        </Button>
                    : <Fragment>
                        <Button color="inherit" component={Link} to="/signup">
                            <FiLogIn size={18} />
                            Signup
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            <IoIosLogIn size={20} />
                            Login
                        </Button>
                    </Fragment>
                }
              </Toolbar>
            </AppBar>
        )
    }
};

const mapStateToProps = (state) => {
    return {
      authenticated: state.user.authenticated,
    };
};

const mapActionsToProps = {
    handleLogout
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));