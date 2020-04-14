import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
// Component
import ScreamSkeleton from '../components/scream/ScreamSkeleton';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
// Action
import { getScreams } from '../redux/actions/screamAction';

class Home extends Component {

  componentDidMount() {
    this.props.getScreams()
  };
  
  render() {
    const { authenticated, loading, screams } = this.props;
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
    authenticated: state.userReducer.authenticated,
    loading: state.screamReducer.loading.get,
    screams: state.screamReducer.screams,
  };
};

const mapActionToProps = {
  getScreams
}


export default connect(mapStateToProps, mapActionToProps)(Home);
