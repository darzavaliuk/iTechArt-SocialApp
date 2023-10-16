import {Dispatch} from "react";
import {resetErrorType} from "../types/types";

type ResetErrorAction = {
    type: typeof resetErrorType;
}


export const resetError =
    () =>
        async (dispatch: Dispatch<ResetErrorAction>) => {
            dispatch({
                type: resetErrorType,
            })
        }
