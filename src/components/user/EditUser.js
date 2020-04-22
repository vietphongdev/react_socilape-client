import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import {editUser} from '../../redux/actions/userAction';

const styles = (theme) => ({
  ...theme.form,
});

class EditUser extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  };

  componentDidMount() {
    const {
      credentials: { bio, website, location },
    } = this.props;
    this.setState({
      bio,
      website,
      location,
    });
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { bio, website, location } = this.state;
    const userData = {
        bio,
        website,
        location
    };
    this.props.editUser(userData);
    this.closeDialog()
  }

  closeDialog = () => {
    this.setState({ open: false });
  };



  render() {
    const { classes } = this.props;
    const { open, bio, website, location } = this.state;

    return (
      <Fragment>
        <Tooltip title="Edit User" placement="top">
          <IconButton onClick={this.openDialog} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={open}
          onClose={this.closeDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="A personal website"
                className={classes.textField}
                value={website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Your location"
                className={classes.textField}
                value={location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                  Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                  Save
              </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    credentials: state.userReducer.user.owner.credentials,
  };
};

const mapActionToProps = {
  editUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditUser));
