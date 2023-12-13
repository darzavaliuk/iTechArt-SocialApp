import { createReducer } from '@reduxjs/toolkit';
import { fetchEventsFailure, fetchEventsRequest, fetchEventsSuccess } from '../actions/createAction';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const eventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEventsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEventsSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchEventsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
