import * as actions from '../actions/action.js';

const carLocationFetchReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.CAR_LOCATION_FETCH_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    carLocations: action.response,
                });
        case actions.CAR_LOCATION_FETCH_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                });
        default:
            return state;
    }
};

export default carLocationFetchReducer;
