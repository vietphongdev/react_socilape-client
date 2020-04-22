import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';

const styles = (theme) => ({
  ...theme.user,
  comment : {
    marginBottom: 25,
    // borderTop: '1px solid rgba(0,0,0,.1)'
  },
  body : {
    marginTop: 8
  }
});

class Comment extends Component {
  

  render() {
    const { classes, comments = [] } = this.props;
    dayjs.extend(relativeTime);
    return (
      <Fragment>
        {comments.map((comment) => {
          const { userHandle : {
            userId,
            userName,
            userImage
          }, body, createdAt } = comment;
          return (
            <div key={createdAt} className={classes.comment}>
              <Grid>
                <Grid container direction="row" alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={userImage}
                    className={classes.avatar}
                  />
                  <Grid>
                    <Typography
                      color="primary"
                      component={Link}
                      to={`/user/${userId}`}
                    >
                      @{userName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.body}>
                  {body}
              </Grid>
              </Grid>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.postReducer.loading.getDetail,
  };
};

const mapActionToProps = {
  
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Comment));
