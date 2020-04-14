import React, { Component } from 'react';
import { CardHeader } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

class SkeletonScream extends Component {

  render() {
    const { quantity = 1 } = this.props;
    return (
        [...Array(quantity)].map((e, i) => 
            <CardHeader
                key={i}
                avatar={
                <Skeleton animation="wave" width={80} height={80} />
                }
                title={
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                />
                }
                subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
        )
      
    );
  }
}


export default SkeletonScream;
