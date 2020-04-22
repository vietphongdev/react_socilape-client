import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography, Link as MuiLink, Grid } from '@material-ui/core';
import { LocationOn, CalendarToday } from '@material-ui/icons';
import { FaUserEdit } from 'react-icons/fa';
import LinkIcon from '@material-ui/icons/Link';
// Component
import UserSkeleton from '../components/user/UserSkeleton';
import EditUser from '../components/user/EditUser';
import Post from '../components/post/Post';
import PostSkeleton from '../components/post/PostSkeleton';
// Actions
import { uploadAvatar, getGuest } from '../redux/actions/userAction';
// Style
import styles from '../styles/UserStyle';

class UserDetail extends Component {
  componentDidMount() {
    const { owner, match } = this.props;
    const { userId } = match.params;
    if (userId !== owner.credentials.userId) {
      this.props.getGuest(userId);
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadAvatar(formData);
  };

  handleEditAvater = () => {
    const fileInput = document.getElementById('avatar');
    fileInput.click();
  };

  render() {
    const {
      classes,
      match,
      loadingOwner,
      loadingGuest,
      owner,
      guest,
    } = this.props;
    let user = guest,
      loading = loadingGuest;
    const { userId } = match.params;
    if (userId === owner.credentials.userId) {
      user = owner;
      loading = loadingOwner;
    }
    const {
      credentials: { userName, createdAt, userImage, bio, website, location },
      posts = [],
    } = user;
    return loading ? (
      <UserSkeleton />
    ) : (
      <Fragment>

        <Typography variant="h5">Profile</Typography>
        <Paper className={classes.paper}>
          <div className={classes.user}>
            <div className={classes.avatar}>
              <img src={userImage} alt="userImage" className={classes.image} />
              <input
                type="file"
                id="avatar"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              {userId === owner.credentials.userId ? (
                <div className={classes.overlay}>
                  <FaUserEdit
                    color="#00BCD4"
                    size={22}
                    onClick={this.handleEditAvater}
                  />
                </div>
              ) : null}
            </div>
            <div>
              <MuiLink
                component={Link}
                to={`/user/${userId}`}
                color="primary"
                variant="h5"
              >
                @{userName}
              </MuiLink>
              <br />
              {bio && <Typography variant="body2">{bio}</Typography>}
              {location && (
                <Fragment>
                  <LocationOn variant="body2" color="primary" />
                  <span>{location}</span>
                  <br />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <br />
                </Fragment>
              )}
              <CalendarToday color="primary" />{' '}
              <span>joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            {userId === owner.credentials.userId ? <EditUser /> : null}
          </div>
        </Paper>
        <br />
        <Typography variant="h5">Posts</Typography>
        
          <Grid>
            {loading ? (
              <PostSkeleton quantity={2} />
            ) : (
              
              posts.map((post, index) => <Post key={index} post={post} />)
            )}
          </Grid>
     
        
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingOwner: state.userReducer.loading.getOwner,
    loadingGuest: state.userReducer.loading.getGuest,
    owner: state.userReducer.user.owner,
    guest: state.userReducer.user.guest,
  };
};

const mapActionToProps = {
  uploadAvatar,
  getGuest,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(UserDetail));
