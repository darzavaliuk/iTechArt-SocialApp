import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    error: null,
    notifications: [],
};

export const notificationReducer = createReducer(initialState, {
    GET_NOTIFICATIONS_REQUEST: state => {
        state.isLoading = true;
    },
    GET_NOTIFICATIONS_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
    },
    GET_NOTIFICATIONS_FAILED: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: state => {
        state.error = null;
    },
});
