import axios, { AxiosError } from 'axios';
import { User } from '../reducers/User';
import { Dispatch } from 'redux';
import { URI } from '../../URI';
import { createAction } from '@reduxjs/toolkit';
import { authRequest } from './authFetch';
import { profileError, profileRequest, profileSuccess } from './createAction';

const getProfile = (id: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(profileRequest());

      const response = await authRequest<any>('get', `${URI}/get-user/${id}`);

      const userProfile: User = response.user;

      dispatch(profileSuccess(userProfile));
    } catch (error) {
      dispatch(profileError((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error'));
    }
  };
};

export default getProfile;
