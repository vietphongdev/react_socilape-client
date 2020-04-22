import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  TextField,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';
import Alert from '../components/layout/Alert';
import { categories } from '../consant';

// Actions
import { createPost } from '../redux/actions/postAction';

const styles = (theme) => ({
  ...theme.form,
  submitButton: {
    float: 'right',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '100%',
    },
  },
};

class CreatePost extends Component {
  state = {
    body: '',
    title: '',
    tags: [],
    category: '',
    open: false,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "category"){
      this.setState({
        category: value,
        tags: []
      })
    } else{
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { body, title, category, tags } = this.state;
    const newPost = {
      category,
      tags,
      title,
      body,
    }
    this.props.createPost(newPost).then((isSuccess) => {
      if (isSuccess) {
        this.handleOpenAlert();
      }
    });
  };

  handleOpenAlert = () => {
    this.setState({ open: true });
  };

  handleLeavePage = () => {
    const { post : { postId, category } } = this.props;
    this.props.history.push(`/${category}/${postId}`);
  };

  handleStayPage = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, loading, error } = this.props;
    const { body, title, category, tags, open } = this.state;
    const tagList = category ? categories[category].tags : [];

    return (
      <Fragment>
        <h2>Create A New Post</h2>
        <form onSubmit={this.handleSubmit}>

          {/* Category */}
          <FormControl
            required
            fullWidth
            className={classes.textField}
            error={error.category ? true : false}
          >
            <InputLabel>CATEGORY</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              {
                Object.keys(categories).map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))
              }
            </Select>
            {error.category && (
              <FormHelperText>{error.category}</FormHelperText>
            )}
          </FormControl>

          {/* Tags */}
          <FormControl
            required
            fullWidth
            className={classes.textField}
            error={error.tags ? true : false}
          >
            <InputLabel>TAGS</InputLabel>
            <Select
              name="tags"
              required
              multiple
              value={tags}
              disabled={!category}
              onChange={this.handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {tagList.map(tag => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
            {error.tags && (
              <FormHelperText>{error.tags}</FormHelperText>
            )}
          </FormControl>
          <TextField
            required
            fullWidth
            multiline
            name="title"
            type="text"
            label="TITLE"
            placeholder="Title of Post"
            value={title}
            helperText={error.title}
            error={error.title ? true : false}
            className={classes.textField}
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            multiline
            name="body"
            type="text"
            label="CONTENT"
            rows="12"
            placeholder="Content of Post"
            helperText={error.body}
            error={error.body ? true : false}
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
              <CircularProgress size={18} className={classes.loadingButton} />
            )}
          </Button>
        </form>
        <Alert
          open={open}
          handleStayPage={this.handleStayPage}
          handleLeavePage={this.handleLeavePage}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.postReducer.loading.create,
    error: state.postReducer.error.create,
    post: state.postReducer.post,
  };
};

const mapActionToProps = {
  createPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CreatePost));
