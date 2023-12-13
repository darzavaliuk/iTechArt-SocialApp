import { createReducer } from '@reduxjs/toolkit';
import { Post, Reply } from './User';

interface PostState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  post: Post | null;
  posts: Post[];
  postsUser: Post[];
  repliesUser: Post[];
}

const initialState: PostState = {
  posts: [] as Post[],
  post: {} as Post,
  error: null,
  isSuccess: false,
  isLoading: true,
  postsUser: [] as Post[],
  repliesUser: [] as Post[],
};

export const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('CREATE_POST_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      state.isSuccess = true;
    })
    .addCase('CREATE_POST_FAILED', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('CREATE_POST_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('GET_POSTS_SUCCESS', (state, action) => {
      console.log('dataPosts <<<', action.payload.dataPosts);
      state.isLoading = false;
      state.posts = action.payload.dataPosts;
    })
    .addCase('GET_POSTS_FAILED', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    })
    .addCase('GET_POST_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('GET_POST_SUCCESS', (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      state.postsUser = action.payload.dataPosts;
    })
    .addCase('GET_POST_FAILED', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('GET_REPLIES_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('GET_REPLIES_SUCCESS', (state, action) => {
      state.isLoading = false;
      state.repliesUser = action.payload.dataPosts;
    })
    .addCase('GET_REPLIES_FAILED', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
