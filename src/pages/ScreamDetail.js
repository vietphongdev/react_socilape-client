import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Grid, Typography } from '@material-ui/core';
// Component
import ScreamDetailHeader from '../components/scream/ScreamDetailHeader';
import ScreamDetailBody from '../components/scream/ScreamDetailBody';
import ShareScream from '../components/scream/ShareScream';
import HotScream from '../components/scream/HotScream';
import AddComment from '../components/scream/AddComment';
import Comment from '../components/scream/Comment';
// ACtions
import { getScream } from '../redux/actions/screamAction';

const styles = (theme) => ({
  shareScream: {
    position: 'relative',
  },
  screamBody: {
    paddingRight: 30,
  },
  commentBox: {
    padding: 20,
  },
});

class ScreamDetail extends Component {
  componentDidMount() {
    const {
      params: { category, screamId },
    } = this.props.match;

    this.props.getScream(screamId);
  }

  render() {
    const { classes, authenticated, scream } = this.props;

    return (
      <Fragment>
        {/* Scream Header */}
        <Grid>
          <ScreamDetailHeader scream={scream} />
        </Grid>

        {/* Scream Body */}
        <Grid container direction="row" style={{ position: 'relative' }}>
          {/* Share Scream */}
          <Grid item xs={1} className={classes.shareScream}>
            <ShareScream />
          </Grid>
          {/* Scream Body */}
          <Grid item xs={8} className={classes.screamBody}>
            <ScreamDetailBody />
          </Grid>
          {/* Hot Scream  */}
          <Grid item xs={3}>
            <HotScream />
          </Grid>
        </Grid>

        {/* Scream Footer */}
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
              <AddComment screamId={scream.screamId} />
            </Paper>
          ) : null}

          <Paper variant="outlined" className={classes.commentBox}>
            <Comment comments={scream.comments} />
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scream: state.screamReducer.scream,
    authenticated: state.userReducer.authenticated,
  };
};

const mapActionToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ScreamDetail));
