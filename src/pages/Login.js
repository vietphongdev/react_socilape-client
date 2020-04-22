import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Button, CircularProgress, Typography, TextField  } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAuthenticate } from '../redux/actions/userAction';
 
const styles = (theme) => ({
  ...theme.form
});

class Login extends Component {
  state = {
    email: '',
		password: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const userData = { email, password };
    this.props.handleAuthenticate('/login', userData, this.props.history);
  };

  render() {
    const { classes, loading, error } = this.props;
     
    const { email, password } = this.state;
    return (
      <Grid container className={classes.container}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" className={classes.formTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              helperText={error.email}
              error={error.email ? true : false}
              className={classes.textField}
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              helperText={error.password}
              error={error.password ? true : false}
              className={classes.textField}
              value={password}
              onChange={this.handleChange}
            />
            {
							Object.entries(error).length ?
              <Typography variant="body2" className={classes.customError}>
                {error.general}
              </Typography> : null
            }
            <Button
              type="submit"
              variant="contained"
              color="primary"
							className={classes.button}
							disabled={loading}
            >
              Login
							{
								loading && <CircularProgress size={18} className={classes.loadingButton} />
							}
            </Button>
						<br />
						<small>Don't have a account ? sign up <Link to="/signup">Here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.userReducer.loading.authenticated,
    error: state.userReducer.error.authenticated,
  }
};

const mapActionToProps = {
  handleAuthenticate
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login));
