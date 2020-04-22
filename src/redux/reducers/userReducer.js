import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  GET_OWNER_REQUEST,
  GET_OWNER_SUCCESS,
  GET_OWNER_FAILURE,
  GET_GUEST_REQUEST,
  GET_GUEST_SUCCESS,
  GET_GUEST_FAILURE,
  LIKE_POST,
  UNLIKE_POST,
  LOGOUT_SUCCESS,
} from '../types';

const initialState = {
  loading: {
    authenticated: false,
    getOwner: false,
    getGuest: false,
  },
  authenticated: false,
  user: {
    owner: {
      credentials: {},
      likes: [],
      notifications: [],
    },
    guest: {
      credentials: {},
      posts: []
    },
  },
  error: {
    authenticated: {},
    getOwner: null,
    getGuest: null,
  },
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          authenticated: true,
        },
      };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          authenticated: false,
        },
        authenticated: true,
        error: {
          ...state.error,
          authenticated: {},
        },
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          authenticated: false,
        },
        error: {
          ...state.error,
          authenticated: payload,
        },
      };

    // GET OWNER
    case GET_OWNER_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          getOwner: true,
        },
      };
    case GET_OWNER_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          getOwner: false,
        },
        user: {
          ...state.user,
          owner: payload,
        },
        error: {
          ...state.error,
          getOwner: null,
        },
      };

    // GET GUEST
    case GET_GUEST_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          getGuest: true,
        },
      };
    case GET_GUEST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          getGuest: false,
        },
        user: {
          ...state.user,
          guest: payload,
        },
        error: {
          ...state.error,
          getGuest: null,
        },
      };
    case GET_GUEST_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          getGuest: false,
        },
        error: {
          ...state.error,
          getGuest: payload,
        },
      };

    // LIKE
    // case LIKE_POST:
    //   return {
    //     ...state,
    //     likes: [
    //       ...state.likes,
    //       {
    //         userHandle: state.credentials.handle,
    //         postId: payload.postId
    //       }
    //     ]
    //   };
    // case UNLIKE_POST:
    //   return {
    //     ...state,
    //     likes: state.likes.filter(like => like.postId !== payload.postId)
    //   };

    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
