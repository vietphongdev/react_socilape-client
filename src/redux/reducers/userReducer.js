import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../types';

const initialState = {
  loading: false,
  authenticated: false,
  errors: {},
  userLoading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        errors: {},
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

      
    case GET_USER_REQUEST:
      return {
        ...state,
        userLoading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        ...payload,
      };


    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
