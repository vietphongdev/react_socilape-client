import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, TextField, CircularProgress } from '@material-ui/core';
// Actions
import { addComment } from '../../redux/actions/screamAction';

const styles = (theme) => ({
  ...theme.form,
});

class AddComment extends Component {
  state = {
    comment: '',
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.screamId, { body: this.state.comment });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
  }
  

  render() {
    const { classes, loading, error } = this.props;
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          multiline
          name="comment"
          type="text"
          rows="3"
          placeholder="Comment of Scream"
          error={!!error}
          helperText={error}
          className={classes.textField}
          onChange={this.handleChange}
          value={comment}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
          disabled={loading || !comment}
        >
          Submit
          {loading && (
            <CircularProgress size={18} className={classes.loadingButton} />
          )}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.addComment,
    error: state.screamReducer.errors.addComment,
  };
};

const mapActionToProps = {
  addComment,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AddComment));
