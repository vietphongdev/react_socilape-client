import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
// Component
import PostSkeleton from '../components/post/PostSkeleton';
import Post from '../components/post/Post';
// Action
import { getPosts } from '../redux/actions/postAction';

class Home extends Component {

  componentDidMount() {   
    this.props.getPosts()
  };
  
  render() {
    const { loading, posts } = this.props;
    return (
      <Grid container spacing={10}>
        <Grid item>
          {
            loading 
            ? <PostSkeleton quantity={2} />
            : posts && posts.map((post, index) => <Post key={index} post={post} />)
          }
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.postReducer.loading.get,
    posts: state.postReducer.posts,
  };
};

const mapActionToProps = {
  getPosts
}


export default connect(mapStateToProps, mapActionToProps)(Home);
