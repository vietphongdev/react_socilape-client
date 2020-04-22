import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AiOutlineLike } from 'react-icons/ai';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdShare } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
// Component
import DeletePost from './DeletePost';
// Acion
import { likePost, unlikePost } from '../../redux/actions/postAction';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  cardContent: {
    padding: 25,
  },
  describe : {
    marginTop: 15
  },
  cardAction: {
    minWidth: 130,
    marginLeft: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
};

class Post extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  isLikedPost = () => {
    const { likes, post } = this.props;
    const isLiked = likes.some((like) => like.postId === post.postId);
    return isLiked;
  };

  changeLike = () => {
    const isLiked = this.isLikedPost();
    const { post } = this.props;
    if (isLiked) {
      this.props.unlikePost(post.postId);
    } else {
      this.props.likePost(post.postId);
    }
  };

  render() {
    const {
      classes,
      authenticated,
      userId,
      post: {
        postId,
        category,
        title,
        body,
        createdAt,
        authorId,
        authorName,
        authorImage,
        likeCount,
        commentCount,
      },
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    dayjs.extend(relativeTime);

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={authorImage}
          title="User image"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/${category}/${postId}`}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <MuiLink
              component={Link}
              to={`/user/${authorId}`}
              color="primary"
            >
              @{authorName}
            </MuiLink>
            {" / "}
            {dayjs(createdAt).fromNow()}
            {" / "}
            <MuiLink
              component={Link}
              to={`/${category}`}
              color="primary"
            >
              {category}
            </MuiLink>
          </Typography>
          <Typography variant="body1" className={classes.describe}>{body.slice(0, 220)}...</Typography>
        </CardContent>

        <CardActions className={classes.cardAction}>
          {authenticated && authorId === userId ? (
            <div>
              <IconButton onClick={this.handleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem>
                  <FiEdit /> Edit
                </MenuItem>
                <MenuItem>
                  <DeletePost postId={postId} />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <IconButton
              size="small"
              disabled={!authenticated}
              onClick={this.changeLike}
            >
              {likeCount}{' '}
              <AiOutlineLike color={this.isLikedPost() ? '#00BCD4' : null} />
            </IconButton>
            <IconButton
              size="small"
              style={{ marginLeft: 4 }}
              disabled={!authenticated}
            >
              {commentCount}
              <GoCommentDiscussion style={{ marginLeft: 2 }} />
            </IconButton>
            <IconButton
              size="small"
              style={{ marginLeft: 4 }}
              disabled={!authenticated}
            >
              {commentCount} <MdShare style={{ marginLeft: 2 }} />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.userReducer.authenticated,
    likes: state.userReducer.user.owner.likes,
    userId: state.userReducer.user.owner.credentials.userId,
  };
};

const mapActionToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Post));
