import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { URI } from '../../URI';
import { authRequest } from './authFetch';
import {
  getPostFailed,
  getPostRequest,
  getPostSuccess,
  getRepliesFailed,
  getRepliesRequest,
  getRepliesSuccess,
} from './createAction';

export type GetPostsAction =
  | ReturnType<typeof getPostRequest>
  | ReturnType<typeof getPostSuccess>
  | ReturnType<typeof getPostFailed>;

export const getPosts = () => async (dispatch: Dispatch<GetPostsAction>) => {
  try {
    dispatch(getPostRequest());

    const data = await authRequest<any>('get', `${URI}/get-posts`);

    const dataPosts = data.posts;

    dispatch(getPostSuccess({ dataPosts }));
  } catch (error) {
    dispatch(getPostFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error'));
  }
};
