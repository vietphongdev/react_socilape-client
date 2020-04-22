import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Grid, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
// Component
import PostDetailHeader from '../components/post/PostDetailHeader';
import PostDetailBody from '../components/post/PostDetailBody';
import SharePost from '../components/post/SharePost';
import RecentPost from '../components/post/RecentPost';
import AddComment from '../components/post/AddComment';
import Comment from '../components/post/Comment';
// ACtions
import { getPost } from '../redux/actions/postAction';

const styles = (theme) => ({
  sharePost: {
    position: 'relative',
  },
  postBody: {
    paddingRight: 30,
    margin: '30px auto'
  },
  recentPost: {
    marginTop: 30
  },
  commentBox: {
    padding: 20,
  },
});

class PostDetail extends Component {
  componentDidMount() {
    const {
      params: { postId },
    } = this.props.match;

    this.props.getPost(postId);
  }

  render() {
    const { classes, authenticated, post } = this.props;

    return (
      <Fragment>
        {/* Post Header */}
        <Grid>
          <PostDetailHeader post={post} />
        </Grid>

        {/* Post Body */}
        <Grid container direction="row" style={{ position: 'relative' }}>
          {/* Share Post */}
          <Grid item xs={1} className={classes.sharePost}>
            <SharePost />
          </Grid>
          {/* Post Body */}
          <Grid item xs={8} className={classes.postBody}>
            <PostDetailBody />
          </Grid>
          {/* Recent Post  */}
          <Grid item xs={3} className={classes.recentPost}>
            <RecentPost />
          </Grid>
        </Grid>

        {/* Post Footer */}
        <Grid>
          <Typography variant="h6" component="h2">
            Comments
          </Typography>
          {authenticated ? (
            <Paper
              variant="outlined"
              className={classes.commentBox}
              style={{ marginBottom: 20 }}
            >
              <AddComment postId={post.postId} />
            </Paper>
          ) : null}

          <Paper variant="outlined" className={classes.commentBox}>
            {
              post.comments && post.comments.length
              ? <Comment comments={post.comments} />
              : <Grid container direction="row" justify="center">
                 <QuestionAnswerIcon/>
                 {" No comment yet..."}
                </Grid>
            }
            
            
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post,
    authenticated: state.userReducer.authenticated,
  };
};

const mapActionToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostDetail));
