import {Dispatch} from "react";

export const resetError =
    () =>
        async (dispatch: Dispatch<any>) => {
            dispatch({
                type: 'resetError',
            })
        }
