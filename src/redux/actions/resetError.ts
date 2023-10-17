import { Dispatch } from "react";
import { ActionType } from "typesafe-actions";
import {RESET_ERROR} from "../actionTypes/actionTypes";
import {createAction} from "redux-actions";

type ResetErrorRequestPayload = void;

const resetErrorRequest = createAction<ResetErrorRequestPayload>(RESET_ERROR);

type ResetErrorAction =
    | ActionType<typeof resetErrorRequest>

export const resetError = () => async (dispatch: Dispatch<ResetErrorAction>) => {
    dispatch(resetErrorRequest());
};
