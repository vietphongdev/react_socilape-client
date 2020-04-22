import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { messages } from '../../consant';

class Alert extends Component {
  render() {
		const { open, handleLeavePage, handleStayPage } = this.props;
    return (
      <Dialog open={open} >
        <DialogTitle>
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messages.CREATE_POST_SUCCESS}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLeavePage()} color="primary">
            Leave Page
          </Button>
          <Button onClick={() => handleStayPage()} color="primary" autoFocus>
            Stay on Page
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Alert;
