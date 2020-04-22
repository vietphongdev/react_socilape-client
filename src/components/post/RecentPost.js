import React, { Component, Fragment } from 'react';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  createdAt: {
    marginTop: 'auto',
    fontSize: 12,
    width: 120,
    textAlign: 'right',
    color: '#8e8e8e',
  },
  recentNew: {
    position: 'relative',
    marginBottom: 20,
    '&::before': {
      top: '72%',
      left: '40%',
      width: '60%',
      height: 1,
      content: '""',
      position: 'absolute',
      background: '#c7c7c7',
    },
  },
});

class RecentPost extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h6" component="h2" className={classes.recentNew}>
          Recent news
        </Typography>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </Fragment>
              }
            />
            <span className={classes.createdAt}>Jan 7, 2014</span>
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </Fragment>
              }
            />
            <span className={classes.createdAt}>Jan 7, 2014</span>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </Fragment>
              }
            />
            <span className={classes.createdAt}>Jan 7, 2014</span>
          </ListItem>
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(RecentPost);
