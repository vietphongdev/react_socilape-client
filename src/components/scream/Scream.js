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
  MenuItem 
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AiOutlineLike } from 'react-icons/ai';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdShare } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
// Component
import DeleteScream from './DeleteScream';
// Acion
import { likeScream, unlikeScream } from '../../redux/actions/screamAction';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
  },
  action: {
    marginLeft: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
};

class Scream extends Component {

  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {   
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  isLikedScream = () => {
		const { likes, scream } = this.props;
		const isLiked =  likes.some(like => like.screamId === scream.screamId);
		return isLiked
	};

	changeLike = () => {
		const isLiked = this.isLikedScream();
		const { scream } = this.props;
		if(isLiked){
			this.props.unlikeScream(scream.screamId);
		}else{
			this.props.likeScream(scream.screamId);
		}
	};


  render() {
    const {
      classes,
      authenticated,
      handle,
      scream: {
        screamId,
        category,
        title,
        body,
        createdAt,
        authorImage,
        authorName,
        authorId,
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
          title="Profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/${category}/${screamId}`}
          >
            {title || "Old data"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        
        <CardActions className={classes.action}>
          {
            authenticated && authorName === handle 
            ? <div>
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
                  <DeleteScream screamId={screamId} />
                </MenuItem>
            </Menu>
              </div>
            : <div></div>
          }
          <div>
            <IconButton size="small" disabled={!authenticated} onClick={this.changeLike}>
              {likeCount} <AiOutlineLike color={this.isLikedScream() ? "#00BCD4" : null} />
            </IconButton>
            <IconButton size="small" style={{marginLeft: 4}} disabled={!authenticated}>
             {commentCount}<GoCommentDiscussion style={{marginLeft: 2}} />
            </IconButton>
            <IconButton size="small" style={{marginLeft: 4}} disabled={!authenticated}>
             {commentCount} <MdShare style={{marginLeft: 2}} />
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
    likes: state.userReducer.likes,
    handle: state.userReducer.credentials.handle,
  };
};

const mapActionToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Scream));
