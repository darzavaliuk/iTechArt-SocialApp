import axios from 'axios';
import {URI} from "../../URI";
import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const fetchEventsRequest: ActionCreatorWithPayload<
    {
        month: number;
        year: number;
    },
    typeof FETCH_EVENTS_REQUEST
> = createAction(FETCH_EVENTS_REQUEST);

export const fetchEventsSuccess: ActionCreatorWithPayload<any, typeof FETCH_EVENTS_SUCCESS> = createAction(
    FETCH_EVENTS_SUCCESS
);

export const fetchEventsFailure: ActionCreatorWithPayload<any, typeof FETCH_EVENTS_FAILURE> = createAction(
    FETCH_EVENTS_FAILURE
);

export type GetEvents =
    | ReturnType<typeof fetchEventsRequest>
    | ReturnType<typeof fetchEventsSuccess>
    | ReturnType<typeof fetchEventsFailure>;

export const fetchEvents = (month: number, year: number) => async (dispatch: Dispatch<GetEvents>) => {
    const userId = '652daf0ced32d1d13d6c0764';
    const startTime = `${year}-${month + 1}-01`;
    const endTime = `${year}-${month + 1}-30`;
    ++month;
    dispatch(fetchEventsRequest({month, year}));

    try {
        const response = await axios.post(`${URI}/get-subtargets`, {
            userId,
            startTime,
            endTime,
        });

        const data = response.data;
        dispatch(fetchEventsSuccess(data));

        return data;
    } catch (error) {
        dispatch(fetchEventsFailure(error));
    }
};
