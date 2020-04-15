import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Material-Ui
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Chip, Grid } from '@material-ui/core';
// Component
import ShareScream from './ShareScream';
import HotScream from './HotScream';
// React-icon

const styles = (theme) => ({
  tag: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
});

class ScreamDetailBody extends Component {
  render() {
    const {
      classes,
      scream: { title, body },
    } = this.props;
    return (
      <Fragment>
          {/* Title */}
        <Typography variant="h4" className={classes.screamTitle}>
          {title}
        </Typography>
         {/* Tag */}
         <div className={classes.tag}>
          <Chip label="Python" component="a" href="#chip" clickable />
          <Chip label="Programing" component="a" href="#chip" clickable />
          <Chip label="Framework" component="a" href="#chip" clickable />
        </div>
        <p>
          Vậy GraphQL là gì? GraphQL là một Graph Query Language được dành cho
          API. Nó được phát triển bởi Facebook. GraphQL từ khi ra đời đã gần như
          thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất
          nhiều. GraphQL khác REST ở chỗ nào? Vấn đề mà REST đang gặp phải là nó
          việc phản hồi dữ liệu của REST trả về quá nhiều hoặc là quá ít. Trong
          cả 2 trường hợp thì hiệu suất của ứng dụng đều bị ảnh hưởng khá nhiều.
        </p>
        <p>
          Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một
          client có thể xác định chính xác dữ liệu mà mình cần từ một API. Hơn
          nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một
          endpoint. Hai phía Client và Server tương tác với nhau thông qua giao
          thức POST GraphQL Schema Definition Language (SDL).
        </p>
        <p>
          Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần
          phải định nghĩa Schema để xem Client có thể truy cập được những dữ
          liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
          Ví dụ Schema của User
        </p>
        <p>
          Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một
          client có thể xác định chính xác dữ liệu mà mình cần từ một API. Hơn
          nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một
          endpoint. Hai phía Client và Server tương tác với nhau thông qua giao
          thức POST GraphQL Schema Definition Language (SDL).
        </p>
        <p>
          Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần
          phải định nghĩa Schema để xem Client có thể truy cập được những dữ
          liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
          Ví dụ Schema của User
        </p>
        <p>
          Vậy GraphQL là gì? GraphQL là một Graph Query Language được dành cho
          API. Nó được phát triển bởi Facebook. GraphQL từ khi ra đời đã gần như
          thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất
          nhiều. GraphQL khác REST ở chỗ nào? Vấn đề mà REST đang gặp phải là nó
          việc phản hồi dữ liệu của REST trả về quá nhiều hoặc là quá ít. Trong
          cả 2 trường hợp thì hiệu suất của ứng dụng đều bị ảnh hưởng khá nhiều.
        </p>
        <p>
          Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một
          client có thể xác định chính xác dữ liệu mà mình cần từ một API. Hơn
          nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một
          endpoint. Hai phía Client và Server tương tác với nhau thông qua giao
          thức POST GraphQL Schema Definition Language (SDL).
        </p>
        <p>
          Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần
          phải định nghĩa Schema để xem Client có thể truy cập được những dữ
          liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
          Ví dụ Schema của User
        </p>
        <p>
          Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một
          client có thể xác định chính xác dữ liệu mà mình cần từ một API. Hơn
          nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một
          endpoint. Hai phía Client và Server tương tác với nhau thông qua giao
          thức POST GraphQL Schema Definition Language (SDL).
        </p>
        <p>
          Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần
          phải định nghĩa Schema để xem Client có thể truy cập được những dữ
          liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
          Ví dụ Schema của User
        </p>
        <p>
          Giải pháp mà GraphQL đưa ra là cho phép khai báo dữ liệu nơi mà một
          client có thể xác định chính xác dữ liệu mà mình cần từ một API. Hơn
          nữa, thay vì có nhiều endpoint như REST, GraphQL chỉ có duy nhất một
          endpoint. Hai phía Client và Server tương tác với nhau thông qua giao
          thức POST GraphQL Schema Definition Language (SDL).
        </p>
        <p>
          Để Client và Server có chung sự thống nhất và hiểu nhau, chúng ta cần
          phải định nghĩa Schema để xem Client có thể truy cập được những dữ
          liệu gì tương tự Server trả về cho client những dữ liệu như thế nào.
          Ví dụ Schema của User
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.loading.getDetail,
    scream: state.screamReducer.scream,
  };
};

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ScreamDetailBody));
