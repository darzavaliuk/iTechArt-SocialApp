import { Reply } from '../reducers/User';
import { URI } from '../../URI';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { authRequest } from './authFetch';
import { getRepliesIdError, getRepliesIdRequest, getRepliesIdSuccess } from './createAction';

export const getReplies = (id: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getRepliesIdRequest());

      const response = await authRequest<any>('get', `${URI}/get-replies/${id}`);

      const replies: Reply[] = response.posts;

      dispatch(getRepliesIdSuccess(replies));
    } catch (error) {
      dispatch(
        getRepliesIdError((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error')
      );
    }
  };
};
