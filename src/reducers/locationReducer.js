import {SAVE_NEW_MARKER, GET_ALL_MARKERS, DELETE_ALL_MARKERS, CHANGE_MY_LOCATION} from '../reducers/types';

const initialState = {
    lat: 46.47293450032126,
    lng: 30.74108183383942,
    zoom: 15,
    markers: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_NEW_MARKER:
            return {...state, markers: action.payload};

        case GET_ALL_MARKERS:
            return {...state, markers: action.payload};

        case DELETE_ALL_MARKERS:
            return {...state, markers: {}};

        case CHANGE_MY_LOCATION:
            return {...state, lat: action.payload[0], lng: action.payload[1]};

        default:
            return state;
    }
}
