import {
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    GET_OWNER_REQUEST,
    GET_OWNER_SUCCESS,
    GET_GUEST_REQUEST,
    GET_GUEST_SUCCESS,
    GET_GUEST_FAILURE,
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
      dispatch(getOwner());
      history.push('/');
    })
    .catch(err => {
      dispatch({
          type: AUTHENTICATE_FAILURE,
          payload: err.response.data
      });
    });
};

export const getOwner = () => (dispatch) => {
  dispatch({ type: GET_OWNER_REQUEST });
  axios
      .get('/user')
      .then(res => {
          dispatch({
              type: GET_OWNER_SUCCESS,
              payload: res.data
          })
      })
      .catch(err => console.log(err))
};

export const getGuest = (userId) => (dispatch) => {
  dispatch({ type: GET_GUEST_REQUEST });
  axios
    .get(`/user/${userId}`)
    .then(res => {
      dispatch({
          type: GET_GUEST_SUCCESS,
          payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_GUEST_FAILURE,
        payload: err.response.data
      })
    })
};

export const uploadAvatar = formData => dispatch => {
  dispatch({ type: GET_OWNER_REQUEST });
  axios
    .post('/user/avatar', formData)
    .then(() => {
      dispatch(getOwner());
    })
    .catch(err => console.log(err))
};

export const editUser = userData => dispatch => {
  dispatch({ type: GET_OWNER_REQUEST });
  axios
    .post('/user', userData)
    .then(() => {
      dispatch(getOwner());
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