import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { User } from './User';
import { string } from 'yup';

interface UserState {
  _id: string;
  isAuthenticated: boolean;
  loading: boolean;
  isLoading: boolean;
  user: User;
  users: User[];
  token: string;
  error: string | null;
  code: string;
  email: string;
  targets: any[];
}

const initialState: UserState = {
  _id: '',
  isAuthenticated: false,
  loading: false,
  isLoading: false,
  user: {} as User,
  users: [],
  token: '',
  error: null,
  code: '',
  email: '',
  targets: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('RESET_ERROR', (state) => {
      state.error = null;
    })
    .addCase('REGISTER_USER_REQUEST', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('REGISTER_USER_SUCCESS', (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('REGISTER_USER_FAILED', (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('LOAD_USER_REQUEST', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('LOAD_USER_SUCCESS', (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase('LOAD_USER_FAILED', (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    })
    .addCase('LOGIN_USER_REQUEST', (state) => {
      state.isAuthenticated = false;
      state.loading = true;
    })
    .addCase('LOGIN_USER_SUCCESS', (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('LOGIN_USER_FAILED', (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
      state.user = {} as User;
    })
    .addCase('FORGET_PASSWORD_REQUEST', (state) => {
      state.code = '';
      state.loading = true;
    })
    .addCase('FORGET_PASSWORD_SUCCESS', (state, action: PayloadAction<{ code: string; email: string }>) => {
      state.code = action.payload.code;
      state.email = action.payload.email;
      state.loading = false;
    })
    .addCase('FORGET_PASSWORD_FAILED', (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('RESET_PASSWORD_REQUEST', (state) => {
      state.error = null;
      state.loading = true;
    })
    .addCase('RESET_PASSWORD_SUCCESS', (state) => {
      state.error = null;
      state.loading = false;
    })
    .addCase('RESET_PASSWORD_FAILED', (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase('LOGOUT_USER_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('LOGOUT_USER_SUCCESS', (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {} as User;
    })
    .addCase('LOGOUT_USER_FAILED', (state) => {
      state.loading = false;
    })
    .addCase('GET_USERS_REQUEST', (state) => {
      state.isLoading = true;
    })
    .addCase('GET_USERS_SUCCESS', (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase('GET_USERS_FAILED', (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase('LOAD_TARGETS_REQUEST', (state) => {
      state.targets = [];
    })
    .addCase('LOAD_TARGETS_SUCCESS', (state, action: PayloadAction<{ targets: any[] }>) => {
      state.targets = action.payload.targets;
    })
    .addCase('LOAD_TARGETS_FAILED', (state) => {
      state.targets = [];
    })
    .addCase('CREATE_TARGET_REQUEST', (state, action) => {
      state.targets = [...state.targets, { name: action.payload.subtitle, subTargets: action.payload.subtargets }];
    })
    .addCase('SET_TARGET_FAILED', (state) => {
      state.targets = [];
    });
});
