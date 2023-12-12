import {URI} from "../../URI";
import {Dispatch} from "redux";
import {authRequest} from "./authFetch";
import {fetchEventsFailure, fetchEventsRequest, fetchEventsSuccess} from "./createAction";

export type GetEvents =
    | ReturnType<typeof fetchEventsRequest>
    | ReturnType<typeof fetchEventsSuccess>
    | ReturnType<typeof fetchEventsFailure>;

interface PostData {
    data: object
}

export const fetchEvents = (month: number, year: number) => async (dispatch: Dispatch<GetEvents>) => {
    const startTime = `${year}-${month + 1}-01`;
    const endTime = `${year}-${month + 1}-30`;
    ++month;
    dispatch(fetchEventsRequest({month, year}));

    try {
        const response = await authRequest<PostData>('post', `${URI}/get-subtargets`, {
            startTime,
            endTime,
        });

        const data = response;
        dispatch(fetchEventsSuccess(data));

        return data;
    } catch (error) {
        dispatch(fetchEventsFailure(error));
    }
};
