import {FETCH_EVENTS_FAILURE, FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS} from "../actions/getEvents";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case FETCH_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
