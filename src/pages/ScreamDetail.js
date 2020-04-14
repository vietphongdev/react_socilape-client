import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import Author from '../components/scream/Author'
// ACtions
import { getScream } from '../redux/actions/screamAction';

const styles = (theme) => ({
  ...theme.form,
});

class ScreamDetail extends Component {

  componentDidMount() {
    
    
    const { params : { category, screamId } } = this.props.match;
    
    this.props.getScream(screamId)
  }
  

  render() {

    const { classes, scream } = this.props;

    return (
      <Author scream={scream} />
		);
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.getDetail,
    scream: state.screamReducer.scream,
  };
};

const mapActionToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ScreamDetail));
