import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    loading: false,
    isLoading: false,
    user: {},
    users: [],
    token: "",
    error: null,
    code: "",
    email: ""
};

export const userReducer = createReducer(initialState, {
    RESET_ERROR: state => {
        state.error = null;
    },
    REGISTER_USER_REQUEST: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    REGISTER_USER_FAILED: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    LOAD_USER_REQUEST: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    LOAD_USER_FAILED: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
    },
    LOGIN_USER_REQUEST: state => {
        state.isAuthenticated = false;
        state.loading = true;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LOGIN_USER_FAILED: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        state.user = {};
    },
    FORGET_PASSWORD_REQUEST: state => {
        state.code = "";
        state.loading = true;
    },
    FORGET_PASSWORD_SUCCESS: (state, action) => {
        state.code = action.payload.code;
        state.email = action.payload.email;
        state.loading = false;
    },
    FORGET_PASSWORD_FAILED: (state, action) => {
        state.code = "";
        state.error = action.payload;
        state.loading = false;
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
        state.error = null;
        state.loading = true;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
        state.error = null;
        state.loading = false;
    },
    RESET_PASSWORD_FAILED: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    LOGOUT_USER_REQUEST: state => {
        state.loading = true;
    },
    LOGOUT_USER_SUCCESS: state => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
    },
    LOGOUT_USER_FAILED: state => {
        state.loading = false;
    },
    GET_USERS_REQUEST: state => {
        state.isLoading = true;
    },
    GET_USERS_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    },
    GET_USERS_FAILED: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    }
});
