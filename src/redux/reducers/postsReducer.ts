import { Post, Reply } from './User';
import { Reducer } from '@reduxjs/toolkit';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

interface ReplyState {
  replies: Reply[];
  loading: boolean;
  error: string | null;
}

const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const initialReplyState: ReplyState = {
  replies: [],
  loading: false,
  error: null,
};

const postsReducer: Reducer<PostState> = (state = initialPostState, action) => {
  switch (action.type) {
    case 'GET_POSTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_POSTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const replyReducer: Reducer<ReplyState> = (state = initialReplyState, action) => {
  switch (action.type) {
    case 'GET_REPLIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_REPLIES_SUCCESS':
      return {
        ...state,
        replies: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_REPLIES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { postsReducer, replyReducer };
