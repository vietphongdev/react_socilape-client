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

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    DELETE_SCREAM_REQUEST,
    DELETE_SCREAM_SUCCESS
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: {
        get: false,
        getDetail: false,
        create: false,
        delete: false,
        addComment: false,
    },
    errors: {
        get: null,
        create: null,
        delete: null,
        addComment: null
    }
};

export default function(state = initialState, { type, method, payload }){
    switch (type) {

        // GENERAL
        case CLEAR_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [method]: null
                }
            };

        // CREATE
        case CREATE_SCREAM_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: true
                }
            };
        case CREATE_SCREAM_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: false
                },
                errors: {
                    ...state.errors,
                    create: null
                },
                screams: [
                    payload,
                    ...state.screams
                ]
            };
        case CREATE_SCREAM_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: false
                },
                errors : {
                    ...state.errors,
                    create: payload
                }
            };

        // GET LIST
        case GET_SCREAMS_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    get: true
                }
            };
        case GET_SCREAMS_SUCCESS:
        case GET_SCREAMS_FAILURE:
            return {
                ...state,
                screams: payload,
                loading: {
                    ...state.loading,
                    get: false
                }
            };

        // GET DETAIL
        case GET_SCREAM_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    getDetail: true
                }
            };
        case GET_SCREAM_SUCCESS:
        case GET_SCREAM_FAILURE:
            return {
                ...state,
                scream: payload,
                loading: {
                    ...state.loading,
                    getDetail: false
                }
            };
        
        // LIKE AND UNLIKE
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            return {
                ...state,
                screams: state.screams.map(scream => {
                    if(scream.screamId === payload.screamId){
                        return {
                            ...scream,
                            likeCount: payload.likeCount
                        }
                    }
                    return scream;
                })
            };

        // COMMENT
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addComment: true
                }
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addComment: false
                },
                scream: {
                    ...state.scream,
                    comments: [
                        payload,
                        ...state.scream.comments,
                    ]
                },
                errors: {
                    ...state.errors,
                    addComment: null
                }
            };
        case ADD_COMMENT_FAILURE:            
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addComment: false
                },
                errors: {
                    ...state.errors,
                    addComment: payload
                }
            };
        
        // DELETE
        case DELETE_SCREAM_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true
                }
            }       
        case DELETE_SCREAM_SUCCESS:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== payload),
                loading: {
                    ...state.loading,
                    delete: false
                }
            }       
            
        default:
            return state;
    }
}