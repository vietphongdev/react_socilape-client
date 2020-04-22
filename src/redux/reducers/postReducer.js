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

    LIKE_POST,
    UNLIKE_POST,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS
} from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: {
        get: false,
        getDetail: false,
        create: false,
        delete: false,
        addComment: false,
    },
    error: {
        get: null,
        create: {},
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
                error: {
                    ...state.error,
                    [method]: null
                }
            };

        // CREATE
        case CREATE_POST_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: true
                }
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: false
                },
                error: {
                    ...state.error,
                    create: {}
                },
                post : payload,
                posts: [
                    payload,
                    ...state.posts
                ]
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    create: false
                },
                error : {
                    ...state.error,
                    create: payload
                }
            };

        // GET LIST
        case GET_POSTS_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    get: true
                }
            };
        case GET_POSTS_SUCCESS:
        case GET_POSTS_FAILURE:
            return {
                ...state,
                posts: payload,
                loading: {
                    ...state.loading,
                    get: false
                }
            };

        // GET DETAIL
        case GET_POST_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    getDetail: true
                }
            };
        case GET_POST_SUCCESS:
        case GET_POST_FAILURE:
            return {
                ...state,
                post: payload,
                loading: {
                    ...state.loading,
                    getDetail: false
                }
            };
        
        // LIKE AND UNLIKE
        case LIKE_POST:
        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post.postId === payload.postId){
                        return {
                            ...post,
                            likeCount: payload.likeCount
                        }
                    }
                    return post;
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
                post: {
                    ...state.post,
                    comments: [
                        payload,
                        ...state.post.comments,
                    ]
                },
                error: {
                    ...state.error,
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
                error: {
                    ...state.error,
                    addComment: payload
                }
            };
        
        // DELETE
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true
                }
            }       
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post.postId !== payload),
                loading: {
                    ...state.loading,
                    delete: false
                }
            }       
            
        default:
            return state;
    }
}