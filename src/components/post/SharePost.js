import React, { Component } from 'react';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    position: 'sticky',
    top: 0,
    paddingTop: 100,
    paddingBottom: 100
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

class SharePost extends Component {
  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Facebook />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Twitter />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LinkedIn />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(SharePost);
