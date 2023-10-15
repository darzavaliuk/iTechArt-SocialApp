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
    resetError: state => {
        state.error = null;
    },
    userRegisterRequest: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    userRegisterSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    userRegisterFailed: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    userLoadRequest: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    userLoadSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    userLoadFailed: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
    },
    userLoginRequest: state => {
        state.isAuthenticated = false;
        state.loading = true;
    },
    userLoginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    userLoginFailed: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        state.user = {};
    },
    forgetPasswordRequest: state => {
        state.code = "";
    },
    forgetPasswordSuccess: (state, action) => {
        state.code = action.payload.code;
        state.email = action.payload.email;
    },
    forgetPasswordFailed: (state, action) => {
        state.code = "";
        state.error = action.payload;
    },
    resetPasswordRequest: (state, action) => {
        state.error = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
        state.error = action.payload;
    },
    resetPasswordFailed: (state, action) => {
        state.error = action.payload;
    },
    userLogoutRequest: state => {
        state.loading = true;
    },
    userLogoutSuccess: state => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
    },
    userLogoutFailed: state => {
        state.loading = false;
    },
    getUsersRequest: state => {
        state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    },
    getUsersFailed: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    },
    clearErrors: state => {
        state.error = null;
        state.isAuthenticated = false;
    },
});
