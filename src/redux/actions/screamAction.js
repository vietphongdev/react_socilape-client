import {
    CLEAR_ERROR,

    CREATE_SCREAM_REQUEST,
    CREATE_SCREAM_SUCCESS,
    CREATE_SCREAM_FAILURE,

    GET_SCREAMS_REQUEST,
    GET_SCREAMS_SUCCESS,
    GET_SCREAMS_FAILURE,

    GET_SCREAM_REQUEST,
    GET_SCREAM_SUCCESS,
    GET_SCREAM_FAILURE,

    LIKE_SCREAM,
    UNLIKE_SCREAM,

    DELETE_SCREAM_REQUEST,
    DELETE_SCREAM_SUCCESS
} from '../types';
import axios from 'axios';

// General
export const clearError = (method) => dispatch => {
    dispatch({ type: CLEAR_ERROR, method});
}
// Create Scream
export const createScream = (newScream) => dispatch => {
    dispatch({ type: CREATE_SCREAM_REQUEST});
    axios.post('/scream',newScream)
        .then(res => {
            dispatch({
                type: CREATE_SCREAM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: CREATE_SCREAM_FAILURE,
                payload: err.response.data.body
            })
        })
};

// Get All Scream
export const getScreams = () => dispatch => {
    dispatch({ type: GET_SCREAMS_REQUEST});
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: GET_SCREAMS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_SCREAMS_FAILURE,
                payload: []
            })
        })
};

// Get Scream Detail
export const getScream = (screamId) => dispatch => {
    dispatch({ type: GET_SCREAM_REQUEST });
    axios
    .get(`/scream/${screamId}`)
    .then(res => {
        dispatch({
            type: GET_SCREAM_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SCREAM_FAILURE,
            payload: {}
        })
    })
}
// Like Scream
export const likeScream = (screamId) => dispatch => {
    axios
        .get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// Like Scream
export const unlikeScream = (screamId) => dispatch => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// Delete Scream
export const deleteScream = (screamId) => dispatch => {
    dispatch({ type: DELETE_SCREAM_REQUEST });
    axios
        .delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM_SUCCESS,
                payload: screamId
            })
        })
        .catch(err => console.log(err));
};