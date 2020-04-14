import React, { Component } from 'react';
import { Card, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  card: {
    padding: 20,
    maxWidth: 345,
    margin: theme.spacing(2),
  },
});

class ProfileSkeleton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <Skeleton animation="wave" variant="circle" width={140} height={140} />
          <br />
          <Skeleton width={220} />
          <Skeleton animation={false} width={220} />
          <Skeleton animation="wave" width={220} />
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfileSkeleton);
