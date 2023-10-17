import {Dispatch} from "react";
import {RESET_ERROR} from "../types/types";

type ResetErrorAction = {
    type: typeof RESET_ERROR;
}


export const resetError =
    () =>
        async (dispatch: Dispatch<ResetErrorAction>) => {
            dispatch({
                type: RESET_ERROR,
            })
        }
