import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { URI } from '../../URI';
import { createAction } from '@reduxjs/toolkit';
import { LOAD_TARGETS_FAILED, LOAD_TARGETS_REQUEST, LOAD_TARGETS_SUCCESS } from '../actionTypes/actionTypes';
import { authRequest } from './authFetch';
import { loadTargetsFailed, loadTargetsRequest, loadTargetsSuccess } from './createAction';

export type LoadTargetsAction =
  | ReturnType<typeof loadTargetsRequest>
  | ReturnType<typeof loadTargetsSuccess>
  | ReturnType<typeof loadTargetsFailed>;

export const loadTargets = () => async (dispatch: Dispatch<LoadTargetsAction>) => {
  try {
    dispatch(loadTargetsRequest());

    const data = await authRequest<any>('post', `${URI}/get-targets`);

    const targets = data.targets;

    dispatch(loadTargetsSuccess({ targets }));
  } catch (error: unknown) {
    dispatch(
      loadTargetsFailed(
        (
          error as AxiosError<{
            message: string;
          }>
        )?.response?.data?.message || 'Unexpected error'
      )
    );
  }
};
