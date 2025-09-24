import {
  FETCH_COMMUNITY_POSTS,
  ADD_POST,
  LIKE_POST,
  COMMENT_ON_POST,
  DELETE_POST,
} from './actionTypes';

// Action Creators
export const fetchCommunityPosts = () => {
  return {
    type: FETCH_COMMUNITY_POSTS,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

export const likePost = (postId) => {
  return {
    type: LIKE_POST,
    payload: postId,
  };
};

export const commentOnPost = (postId, comment) => {
  return {
    type: COMMENT_ON_POST,
    payload: { postId, comment },
  };
};

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

// Async Actions
export const fetchCommunityPostsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCommunityPosts());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Community posts fetched');
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  };
};

export const addPostAsync = (postData) => {
  return async (dispatch) => {
    try {
      const post = {
        id: Date.now(),
        ...postData,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        liked: false,
      };
      dispatch(addPost(post));
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Post added successfully');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
};

export const likePostAsync = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(likePost(postId));
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('Post liked successfully');
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
};

