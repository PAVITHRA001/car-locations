import { combineReducers } from 'redux';
import carLocationFetchReducer  from './car_location_fetch_reducer.js';


const combined = combineReducers({
    carLocationFetchReducer
});

export default combined;
