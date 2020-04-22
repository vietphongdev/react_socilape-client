import {
    CLEAR_ERROR,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,

    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,

    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    LIKE_POST,
    UNLIKE_POST,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS
} from '../types';
import axios from 'axios';

// General
export const clearError = (method) => dispatch => {
    dispatch({ type: CLEAR_ERROR, method});
}
// Create Post
export const createPost = (newPost) => dispatch => {    
    dispatch({ type: CREATE_POST_REQUEST});
    return axios.post('/post', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST_SUCCESS,
                payload: res.data
            });
            return true;
        })
        .catch(err => {
            dispatch({
                type: CREATE_POST_FAILURE,
                payload: err.response.data
            });
            return false;
        })
};

// Get All Post
export const getPosts = () => dispatch => {
    dispatch({ type: GET_POSTS_REQUEST});
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS_FAILURE,
                payload: []
            })
        })
};

// Get Post Detail
export const getPost = (postId) => dispatch => {
    dispatch({ type: GET_POST_REQUEST });
    axios
    .get(`/post/${postId}`)
    .then(res => {
        dispatch({
            type: GET_POST_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POST_FAILURE,
            payload: {}
        })
    })
}
// Like Post
export const likePost = (postId) => dispatch => {
    axios
        .get(`/post/${postId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// Like Post
export const unlikePost = (postId) => dispatch => {
    axios
        .get(`/post/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// Add comment
export const addComment = (postId, comment) => dispatch => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    return axios
        .post(`/post/${postId}/comment`, comment)
        .then(res => {
            dispatch({
                type: ADD_COMMENT_SUCCESS,
                payload: res.data
            });
            dispatch(clearError("addComment"));
        })
        .catch(err => {
            dispatch({ 
                type: ADD_COMMENT_FAILURE,
                payload: err.response.data.error
            });
        });
};

// Delete Post
export const deletePost = (postId) => dispatch => {
    dispatch({ type: DELETE_POST_REQUEST });
    axios
        .delete(`/post/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST_SUCCESS,
                payload: postId
            })
        })
        .catch(err => console.log(err));
};