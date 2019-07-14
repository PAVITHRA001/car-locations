import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/action.js';
import callFetchApi from '../fetch_api.js';
import * as constants from '../constants';

export default function* carLocationsFetchSaga(action) {
    try {
        const api_url = constants.carLocationsAPI;
        const response = yield call(callFetchApi, api_url, {}, 'GET');

        yield put({
            type: actions.CAR_LOCATION_FETCH_SUCCESS,
            response: response.data.data,
        });

    } catch (error) {
        yield put({
            type: actions.CAR_LOCATION_FETCH_FAILURE,
            error,
        });
    }
}
