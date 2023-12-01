import {createReducer} from '@reduxjs/toolkit';
import {Post, Reply} from "./User";

const intialState = {
    posts:[] as Post[],
    post:{} as Post,
    error: null,
    isSuccess:false,
    isLoading: true,
    postsUser: [] as Post[],
    repliesUser: [] as Reply[]
};

export const postReducer = createReducer(intialState, {
    CREATE_POST_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.isSuccess = true;
    },
    CREATE_POST_FAILED: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    CREATE_POST_REQUEST: state => {
        state.isLoading = true;
    },
    GET_POSTS_SUCCESS: (state,action) => {
        state.isLoading = false;
        state.posts = action.payload.dataPosts;
    },
    GET_POSTS_FAILED: (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: state => {
        state.error = null;
    },
    GET_POST_REQUEST: state => {
        state.isLoading = true;
    },
    GET_POST_SUCCESS: (state,action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.postsUser = action.payload.dataPosts;
    },
    GET_POST_FAILED: (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    GET_REPLIES_REQUEST: state => {
        state.isLoading = true;
    },
    GET_REPLIES_SUCCESS: (state,action) => {
        state.isLoading = false;
        state.repliesUser = action.payload;
    },
    GET_REPLIES_FAILED: (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
});
