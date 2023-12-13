import { AxiosError } from 'axios';
import { URI } from '../../URI';
import { Dispatch } from 'redux';
import { authRequest } from './authFetch';
import { resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess } from './createAction';

type ResetPasswordAction =
  | ReturnType<typeof resetPasswordRequest>
  | ReturnType<typeof resetPasswordSuccess>
  | ReturnType<typeof resetPasswordFailed>;

export const resetPassword = (email: string, password: string) => async (dispatch: Dispatch<ResetPasswordAction>) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { 'Content-Type': 'application/json' } };

    // const {data} = await axios.post(`${URI}/reset-password`, {email, password}, config);

    const data = await authRequest<any>('post', `${URI}/reset-password`, { email, password }, config);

    dispatch(resetPasswordSuccess({ data }));
  } catch (error) {
    dispatch(
      resetPasswordFailed({
        error:
          (
            error as AxiosError<{
              message: string;
            }>
          )?.response?.data?.message || 'Unexpected error',
      })
    );
  }
};
