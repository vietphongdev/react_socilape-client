import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography, Link as MuiLink } from '@material-ui/core';
import { LocationOn, CalendarToday } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
// Component
import ProfileSkeleton from '../components/skeleton/ProfileSkeleton';
import EditProfile from './EditProfile';
// Actions
import { uploadAvatar } from '../redux/actions/userAction';
// Style
import styles from '../styles/ProfileStyle';

class Profile extends Component {

  handleImageChange = event => {
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
      user: {
        userLoading,
        credentials: { handle, createdAt, imageUrl, bio, website, location },
      },
    } = this.props;
    return (
      userLoading
      ? <ProfileSkeleton />
      : <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className={classes.avatar} >
              <img 
                src={imageUrl} 
                alt="profile" 
                className={classes.image}
              />
              <input type="file" id="avatar" hidden="hidden" onChange={this.handleImageChange} />
              <div className={classes.overlay}>
                <EditIcon color="primary" onClick={this.handleEditAvater}/>
              </div>
            </div>
            <div>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
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
            <EditProfile />
        </div>
			  </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  uploadAvatar
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
