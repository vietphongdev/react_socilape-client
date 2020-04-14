import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// ACtions
import { getScream } from '../../redux/actions/screamAction';

const styles = (theme) => ({
  ...theme.form,
});

class Comment extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.scream.screamId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, comments } = this.props;
    const { open } = this.state;

    return (
      <Grid container>
        {comments.map((comment) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
											<Typography
												variant="h5"
												component={Link}
												to={`/users/${userHandle}`}
												color="primary"
											>
												{userHandle}
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
											</Typography>
											<Typography variant="body1">{body}</Typography>
										</div>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.getDetail,
  };
};

const mapActionToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Comment));
