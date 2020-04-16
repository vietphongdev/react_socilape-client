import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from '@material-ui/core';
// React-icon
import { IoIosStarOutline } from 'react-icons/io';
import { AiOutlineUsergroupAdd, AiOutlineLike } from 'react-icons/ai';
import { TiPencil } from 'react-icons/ti';
import { FiEye } from 'react-icons/fi';
import { GoCommentDiscussion } from 'react-icons/go';

const styles = (theme) => ({
  ...theme.icon,
  followButton: {
    border: 'solid 1px #d5d5d5',
    padding: '0 5px',
    marginLeft: 10,
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: 10
  },
});

class ScreamDetailHeader extends Component {
  render() {
    const {
      classes,
      scream: { authorId, authorName, authorImage, likeCount = 0, comments = 0 },
    } = this.props;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid>
          <Grid container direction="row" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={authorImage}
              className={classes.large}
            />
            <Grid>
              <Grid container direction="row"> 
                <Typography
                  color="primary"
                  component={Link}
                  to={`/users/${authorId}`}
                >
                  @{authorName}
                </Typography>
                <div className={classes.followButton}>Follow</div>
              </Grid>
              <Grid>
                <Tooltip title={`Reputations: ${34}`} placement="bottom">
                  <IconButton
                    onClick={this.openDialog}
                    size="small"
                    className={classes.iconButton}
                  >
                    <IoIosStarOutline color="primary" />: 33
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Followers: ${34}`} placement="bottom">
                  <IconButton
                    onClick={this.openDialog}
                    size="small"
                    className={classes.iconButton}
                  >
                    <AiOutlineUsergroupAdd color="primary" />: 33
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Posts: ${34}`} placement="bottom">
                  <IconButton
                    onClick={this.openDialog}
                    size="small"
                    className={classes.iconButton}
                  >
                    <TiPencil color="primary" />: 33
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid>Published Nov 20th, 2019 4:09 PM</Grid>
          <Grid>
            <Tooltip title={`Views: ${34}`} placement="bottom">
              <IconButton
                onClick={this.openDialog}
                size="small"
                className={classes.iconButton}
              >
                <FiEye color="primary" />: 33
              </IconButton>
            </Tooltip>
            <Tooltip title={`Likes: ${likeCount}`} placement="bottom">
              <IconButton
                onClick={this.openDialog}
                size="small"
                className={classes.iconButton}
              >
                <AiOutlineLike color="primary" />: {likeCount}
              </IconButton>
            </Tooltip>
            <Tooltip title={`Comments: ${comments.length}`} placement="bottom">
              <IconButton
                onClick={this.openDialog}
                size="small"
                className={classes.iconButton}
              >
                <GoCommentDiscussion color="primary" />: {comments.length}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.getDetail,
    scream: state.screamReducer.scream,
  };
};

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ScreamDetailHeader));
