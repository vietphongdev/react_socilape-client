import {
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGOUT_SUCCESS

} from '../types';
import axios from 'axios';

export const handleAuthenticate = (route, userData, history) => (dispatch) => {
  dispatch({type: AUTHENTICATE_REQUEST});
  axios
    .post(route, userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: AUTHENTICATE_SUCCESS });
      dispatch(getUser());
      history.push('/');
    })
    .catch(err => {
      dispatch({
          type: AUTHENTICATE_FAILURE,
          payload: err.response.data
      });
    });
};

export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  axios
      .get('/user')
      .then(res => {
          dispatch({
              type: GET_USER_SUCCESS,
              payload: res.data
          })
      })
      .catch(err => console.log(err))
};

export const uploadAvatar = formData => dispatch => {
  dispatch({ type: GET_USER_REQUEST });
  axios
    .post('/user/avatar', formData)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => console.log(err))
};

export const editProfile = userData => dispatch => {
  dispatch({ type: GET_USER_REQUEST });
  axios
    .post('/user', userData)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => console.log(err))
};


const setAuthorizationHeader = jwt => {
  const token = `Bearer ${jwt}`;
  axios.defaults.headers.common['Authorization'] = token;
  localStorage.setItem('token', token);
}

export const handleLogout = () => dispatch => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = '';
  dispatch({ type: LOGOUT_SUCCESS })
};