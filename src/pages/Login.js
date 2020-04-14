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
    const { classes, user : {loading, errors} } = this.props;    
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
              helperText={errors.email}
              error={errors.email ? true : false}
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
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={password}
              onChange={this.handleChange}
            />
            {
							errors.error && 
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
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
    user: state.userReducer
  }
};

const mapActionToProps = {
  handleAuthenticate
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login));
