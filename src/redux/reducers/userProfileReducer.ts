import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { User } from './User';
import { profileError, profileRequest, profileSuccess } from '../actions/createAction';

interface ProfileState {
  loading: boolean;
  userProfile: User | null;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  userProfile: null,
  error: null,
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(profileRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(profileSuccess, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.userProfile = action.payload;
      state.error = null;
    })
    .addCase(profileError, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
});
