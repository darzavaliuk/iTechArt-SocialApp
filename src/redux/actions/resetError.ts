import { Dispatch } from "react";
import { createAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes/actionTypes";

type ResetErrorRequestPayload = void;

const resetErrorRequest = createAction<ResetErrorRequestPayload>(types.RESET_ERROR);

type ResetErrorAction =
    | ReturnType<typeof resetErrorRequest>

export const resetError = () => async (dispatch: Dispatch<ResetErrorAction>) => {
    dispatch(resetErrorRequest());
};
