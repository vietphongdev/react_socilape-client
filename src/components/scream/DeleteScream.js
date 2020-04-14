import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import { AiOutlineDelete } from 'react-icons/ai';
// Action
import { deleteScream } from '../../redux/actions/screamAction';

const styles = (theme) => ({
  ...theme.form,
});

class DeleteScream extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.handleClose();
  };

  render() {
    const { classes, loading } = this.props;
    return (
      <Fragment>
        <AiOutlineDelete onClick={this.handleOpen} color="#FF3D00" /> Delete
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure to want to delete scream ?</DialogTitle>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.deleteScream}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Delete
              {loading && (
                <CircularProgress size={18} className={classes.loadingButton} />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.delete,
  };
};

const mapActionToProps = {
  deleteScream,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DeleteScream));
