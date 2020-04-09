import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import ScreamSkeleton from '../components/skeleton/ScreamSkeleton';

class Home extends Component {

  state = {
    screams: [],
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true});
    axios
      .get('/screams')
      .then(res => {
        this.setState({
          screams: res.data,
          loading: false
        })
      })
      .catch(err => {
        this.setState({loading: false})
      })
  }
  
  
  render() {
    const {loading, screams} = this.state;
    const { authenticated } = this.props;
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {
            loading 
            ? <ScreamSkeleton quantity={2} />
            : screams && screams.map((scream, index) => <Scream key={index} scream={scream} />)
          }
        </Grid>
        <Grid item sm={4} xs={12}>
          {
            authenticated ? <Profile /> : null
          }
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};


export default connect(mapStateToProps)(Home);
