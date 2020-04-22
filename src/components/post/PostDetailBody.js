import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Chip, Grid } from '@material-ui/core';

const styles = (theme) => ({
  postTitle: {
    marginBottom: 20,
  },
  tag: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
});

class PostDetailBody extends Component {
  render() {
    const {
      classes,
      post: { title, body, tags = [] },
    } = this.props;
    return (
      <Fragment>

        {/* Title */}
        <Typography variant="h4" className={classes.postTitle}>
          {title}
        </Typography>

        {/* Tag */}
        <div className={classes.tag}>
          {
            tags.map(tag => (
              <Chip label={tag} component={Link} to={`/tags/${tag}`} clickable />
            ))
          }
        </div>
         
         <Grid>
           {body}
         </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.postReducer.loading.getDetail,
    post: state.postReducer.post,
  };
};

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostDetailBody));
