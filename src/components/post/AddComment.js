import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, TextField, CircularProgress } from '@material-ui/core';
// Actions
import { addComment } from '../../redux/actions/postAction';

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
    this.props.addComment(this.props.postId, { body: this.state.comment }).then(() => {
      this.setState({comment: ''});
    })
  };  

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
          placeholder="Comment of Post"
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
          disabled={loading}
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
    loading: state.postReducer.loading.addComment,
    error: state.postReducer.error.addComment,
    post: state.postReducer.post,
  };
};

const mapActionToProps = {
  addComment,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AddComment));
