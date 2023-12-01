const initialState = {
    loading: false,
    userProfile: null,
    error: null
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                userProfile: action.payload,
                error: null
            };
        case 'PROFILE_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
