import {
  FETCH_COMMUNITY_POSTS,
  ADD_POST,
  LIKE_POST,
  COMMENT_ON_POST,
  DELETE_POST,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMUNITY_POSTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
              }
            : post
        ),
      };
    case COMMENT_ON_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? { ...post, comments: post.comments + 1 }
            : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default communityReducer;

