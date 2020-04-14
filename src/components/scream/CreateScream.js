import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// Actions
import { createScream, clearError } from '../../redux/actions/screamAction';

const styles = (theme) => ({
  ...theme.form,
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  submitButton : {
    float: 'right'
  }
});

class CreateScream extends Component {
  state = {
    open: false,
    body: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createScream({body: this.state.body});
    this.handleClose();
  }
  handleClose = () => {
    this.props.clearError("create");
    this.setState({ 
      open: false,
      body: ''
    });
  };

  render() {
    const { classes, loading, error } = this.props;
    const { open, body } = this.state;

    return (
      <Fragment>
        <Tooltip title="Create New Scream" placement="bottom" onClick={this.handleOpen}>
          <AddIcon />
        </Tooltip>
        <Dialog open={open} fullWidth maxWidth="sm">
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle>Create A New Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                multiline
                name="body"
                type="text"
                label="SCREAM"
                rows="3"
                placeholder="Content of Scream"
                error={!!error}
                helperText={error}
                className={classes.textField}
                onChange={this.handleChange}
                value={body}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={18}
                    className={classes.loadingButton}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.create,
    error: state.screamReducer.errors.create,
  };
};

const mapActionToProps = {
  createScream,
  clearError
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CreateScream));
