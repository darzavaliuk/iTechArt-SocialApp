import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { URI } from '../../URI';
import { authRequest } from './authFetch';
import { forgetPasswordFailed, forgetPasswordRequest, forgetPasswordSuccess } from './createAction';

type ForgetPasswordAction =
  | ReturnType<typeof forgetPasswordRequest>
  | ReturnType<typeof forgetPasswordSuccess>
  | ReturnType<typeof forgetPasswordFailed>;

interface PostData {
  data: {
    code: string;
  };
}

export const forgetPassword = (email: string) => async (dispatch: Dispatch<ForgetPasswordAction>) => {
  try {
    dispatch(forgetPasswordRequest());

    const config = { headers: { 'Content-Type': 'application/json' } };

    const data = await authRequest<PostData>('post', `${URI}/get-user-forget`, { email }, config);

    dispatch(forgetPasswordSuccess({ code: data.code, email }));
  } catch (error: unknown) {
    dispatch(
      forgetPasswordFailed((error as AxiosError<{ message: string }>)?.response?.data?.message || 'Unexpected error')
    );
  }
};
