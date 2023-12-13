import { createAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as types from '../actionTypes/actionTypes';

const resetPasswordRequest = createAction(types.RESET_PASSWORD_REQUEST);
const resetPasswordSuccess = createAction(types.RESET_PASSWORD_SUCCESS);

type ResetPasswordAction = ReturnType<typeof resetPasswordRequest> | ReturnType<typeof resetPasswordSuccess>;

export const toggleIsLoading = (isLoading: boolean) => async (dispatch: Dispatch<ResetPasswordAction>) => {
  dispatch(resetPasswordRequest());
  dispatch(resetPasswordSuccess());
};
