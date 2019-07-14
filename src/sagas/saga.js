import { takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/action.js';
import carLocationsFetchSaga from './car_location_fetch_saga.js';


export default function* saga() {
    yield takeLatest(actions.CAR_LOCATION_FETCH, carLocationsFetchSaga);
}